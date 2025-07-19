import { app, BrowserWindow, ipcMain, Notification } from "electron";
import path from "path";
import si from "systeminformation";
import { fileURLToPath } from "url";
import process from "node:process";
import os from "os";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AppWindowManager {
  constructor() {
    this.mainWindow = null;
    this.usageInterval = null;
  }

  async sendSystemUsage() {
    try {
      if (!this.mainWindow) return;

      const [cpuData, memData] = await Promise.all([
        si.currentLoad(),
        si.mem(),
      ]);

      this.mainWindow.webContents.send("updateMetrics", {
        cpu: parseFloat(cpuData.currentLoad.toFixed(2)),
        mem: parseFloat(((memData.used / memData.total) * 100).toFixed(2)),
      });
    } catch (err) {
      console.error("Error fetching system usage:", err);
      // No direct error feedback to renderer for this background process
    }
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      width: 850,
      height: 600,
      minWidth: 850,
      minHeight: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.cjs"),
        contextIsolation: true,
        nodeIntegration: false,
      },
      title: "WesGuard",
      icon: path.join(__dirname, "assets/icon.png"), // Assuming an icon file exists
    });

    if (process.env["VITE_DEV_SERVER_URL"]) {
      this.mainWindow.loadURL(process.env["VITE_DEV_SERVER_URL"]);
    } else {
      // For packaged builds, the index.html is typically in the root of the app.asar
      // or directly in the resources folder. Adjust path for production.
      this.mainWindow.loadFile(
        path.join(app.getAppPath(), "dist", "index.html"),
      );
    }

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
      clearInterval(this.usageInterval);
    });
  }

  init() {
    app.whenReady().then(() => {
      this.createWindow();

      // Start sending usage data once window is ready
      this.usageInterval = setInterval(() => this.sendSystemUsage(), 2000);

      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
      });
    });
  }
}

const appWindowManager = new AppWindowManager();
appWindowManager.init();

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// --- IPC Handlers ---

ipcMain.on("get-system-info", async (event) => {
  console.log("Main process: Received 'get-system-info' request.");
  try {
    const [osData, cpuData] = await Promise.all([si.osInfo(), si.cpu()]);
    const systemInfo = {
      os: osData.distro,
      cpu: cpuData.brand,
    };
    console.log("Main process: Sending systemInfoResponse:", systemInfo);
    event.reply("systemInfoResponse", systemInfo);
  } catch (error) {
    console.error("Main process: Error fetching system info:", error);
    event.reply("systemInfoResponse", {
      error: error.message || "Failed to fetch system info",
    });
  }
});

ipcMain.handle("get-disk-usage", async () => {
  try {
    const diskData = await si.fsSize();
    if (diskData.length > 0) {
      const totalDisk = diskData.reduce((acc, fs) => acc + fs.size, 0);
      const usedDisk = diskData.reduce((acc, fs) => acc + fs.used, 0);
      const diskUsagePercentage = parseFloat(
        ((usedDisk / totalDisk) * 100).toFixed(2),
      );
      return {
        diskUsage: diskUsagePercentage,
        totalDisk: totalDisk,
      };
    }
    return { diskUsage: 0, totalDisk: 0 };
  } catch (error) {
    console.error("Error fetching disk usage:", error);
    return { error: error.message || "Failed to fetch disk usage" };
  }
});

ipcMain.handle("get-network-activity", async () => {
  try {
    const netStats = await si.networkStats();
    if (netStats.length > 0) {
      const totalRx = netStats.reduce((acc, net) => acc + net.rx_sec, 0);
      const totalTx = netStats.reduce((acc, net) => acc + net.tx_sec, 0);
      return { netRx: totalRx, netTx: totalTx };
    }
    return { netRx: 0, netTx: 0 };
  } catch (error) {
    console.error("Error fetching network activity:", error);
    return { error: error.message || "Failed to fetch network activity" };
  }
});

// --- Junk File Analyzer ---
ipcMain.handle("analyze-junk-files", async () => {
  const scanLocations = [
    os.tmpdir(),
    // Common junk file locations on Windows
    path.join(os.homedir(), "Downloads"),
    path.join(os.homedir(), "AppData", "Local", "Temp"),
    path.join(
      os.homedir(),
      "AppData",
      "Local",
      "Microsoft",
      "Windows",
      "INetCache",
    ),
    // Common junk file locations on macOS (uncomment if targeting macOS)
    // path.join(os.homedir(), 'Downloads'),
    // path.join(os.homedir(), 'Library', 'Caches'),
    // path.join(os.homedir(), 'Library', 'Logs'),
  ];

  const junkFiles = [];
  let totalSize = 0;

  for (const location of scanLocations) {
    try {
      const files = await fs.readdir(location);
      for (const file of files) {
        const filePath = path.join(location, file);
        try {
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            junkFiles.push({
              name: file,
              path: filePath,
              size: stats.size,
              lastModified: stats.mtimeMs,
            });
            totalSize += stats.size;
          }
        } catch (err) {
          // Ignore errors for individual files (e.g., permission denied)
          console.warn(`Could not access file ${filePath}: ${err.message}`);
        }
      }
    } catch (err) {
      console.error(`Error scanning location ${location}:`, err);
      // Continue to next location even if one fails
    }
  }
  return { files: junkFiles, totalSize: totalSize };
});

// --- Junk File Cleaner ---
ipcMain.handle("execute-cleaning", async (event, filesToDelete) => {
  let successCount = 0;
  let failCount = 0;

  for (const filePath of filesToDelete) {
    try {
      await fs.remove(filePath); // fs-extra's remove works for files and directories
      successCount++;
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err);
      failCount++;
    }
  }

  if (failCount === 0) {
    return {
      success: true,
      message: `Successfully deleted ${successCount} files.`,
    };
  } else if (successCount > 0) {
    return {
      success: false,
      error: `Deleted ${successCount} files, but failed to delete ${failCount} files.`,
    };
  } else {
    return { success: false, error: "Failed to delete any files." };
  }
});

// --- Reminder Notifications ---
ipcMain.on("show-reminder-notification", (event, title, body, sound) => {
  if (BrowserWindow.getAllWindows().length === 0) return; // Don't show if no window is open

  const notification = new Notification({
    title: title,
    body: body,
    silent: !sound, // If sound is provided, it's not silent
  });

  notification.on("click", () => {
    if (appWindowManager.mainWindow) {
      appWindowManager.mainWindow.show();
      appWindowManager.mainWindow.focus();
    }
  });

  notification.show();

  // Play custom sound if provided (Electron's Notification API doesn't directly support custom sounds)
  // This would require a separate audio playback mechanism in the main process or renderer.
  // For now, we'll just rely on the 'silent' property.
});

// --- Settings ---
ipcMain.on("set-system-metrics-interval", (event, interval) => {
  if (appWindowManager.usageInterval) {
    clearInterval(appWindowManager.usageInterval);
  }
  appWindowManager.usageInterval = setInterval(
    () => appWindowManager.sendSystemUsage(),
    interval,
  );
});
