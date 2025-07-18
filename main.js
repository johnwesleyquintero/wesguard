import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import si from "systeminformation";
import { fileURLToPath } from "url";
import process from "node:process";
import os from "os";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow; // Make mainWindow accessible
let usageInterval; // To hold the interval timer

async function sendSystemUsage() {
  try {
    if (!mainWindow) return;

    const [cpuData, memData] = await Promise.all([si.currentLoad(), si.mem()]);

    mainWindow.webContents.send("updateMetrics", {
      cpu: parseFloat(cpuData.currentLoad.toFixed(2)),
      mem: parseFloat(((memData.used / memData.total) * 100).toFixed(2)),
    });
  } catch (err) {
    console.error("Error fetching system usage:", err);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 600,
    minWidth: 850,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: "WesGuard",
    icon: path.join(__dirname, "assets/icon.png"), // Assuming an icon file exists
  });

  if (process.env["VITE_DEV_SERVER_URL"]) {
    mainWindow.loadURL(process.env["VITE_DEV_SERVER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
    clearInterval(usageInterval);
  });
}

app.whenReady().then(() => {
  createWindow();

  // Start sending usage data once window is ready
  usageInterval = setInterval(sendSystemUsage, 2000);

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// --- IPC Handlers ---

ipcMain.on("get-system-info", async (event) => {
  const [osData, cpuData] = await Promise.all([si.osInfo(), si.cpu()]);
  event.reply("systemInfoResponse", {
    os: osData.distro,
    cpu: cpuData.brand,
  });
});

// --- Junk File Analyzer ---
ipcMain.handle("analyze-junk-files", async () => {
  const tempDir = os.tmpdir();
  const junkFiles = [];
  let totalSize = 0;

  try {
    const files = await fs.readdir(tempDir);
    for (const file of files) {
      try {
        const filePath = path.join(tempDir, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile()) {
          junkFiles.push({ name: file, size: stats.size });
          totalSize += stats.size;
        }
      } catch (err) {
        // Ignore errors for individual files (e.g., permission denied)
      }
    }
    return { files: junkFiles, totalSize: totalSize };
  } catch (err) {
    console.error("Error analyzing junk files:", err);
    return { files: [], totalSize: 0 }; // Return empty array and 0 on error
  }
});

// --- Junk File Cleaner ---
ipcMain.handle("execute-cleaning", async () => {
  const tempDir = os.tmpdir();
  try {
    await fs.emptyDir(tempDir);
    return { success: true };
  } catch (err) {
    console.error("Error cleaning temp directory:", err);
    return { success: false };
  }
});
