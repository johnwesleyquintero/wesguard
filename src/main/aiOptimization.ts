import { ipcMain, app } from "electron";
import fs from "fs-extra";
import path from "path";

const DATA_DIR = path.join(app.getPath("userData"), "ai-data");
const PERFORMANCE_LOG_FILE = path.join(DATA_DIR, "performance.json");
const CRASH_LOG_FILE = path.join(DATA_DIR, "crashes.json");

interface PerformanceLogEntry {
  timestamp: string;
  cpu: number;
  mem: number;
  diskUsage: number;
  totalDisk: number;
  netRx: number;
  netTx: number;
}

interface CrashLogEntry {
  timestamp: string;
  appName: string;
  message: string;
}

export function initAIOptimizationHandlers() {
  // Ensure data directory exists
  ipcMain.handle("ai-init-data-dir", async () => {
    await fs.ensureDir(DATA_DIR);
  });

  // Log performance metrics
  ipcMain.handle("ai-log-performance", async (_, data: PerformanceLogEntry) => {
    try {
      let logs: PerformanceLogEntry[] = [];
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      // Keep only the last 1000 entries to prevent file from growing too large
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(PERFORMANCE_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log performance data:", error);
    }
  });

  // Log application crashes (placeholder for now)
  ipcMain.handle("ai-log-crash", async (_, data: CrashLogEntry) => {
    try {
      let logs: CrashLogEntry[] = [];
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(CRASH_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      // Keep only the last 100 entries
      if (logs.length > 100) {
        logs = logs.slice(logs.length - 100);
      }
      await fs.writeFile(CRASH_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log crash data:", error);
    }
  });

  // Analyze data and provide suggestions (basic implementation)
  ipcMain.handle("ai-get-suggestions", async () => {
    const suggestions: string[] = [];

    try {
      // Analyze performance logs
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        const logs: PerformanceLogEntry[] = JSON.parse(
          await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"),
        );
        const recentLogs = logs.slice(-50); // Analyze last 50 entries

        // Example: High CPU usage over time
        const highCpuCount = recentLogs.filter((log) => log.cpu > 80).length;
        if (highCpuCount > 10) {
          suggestions.push(
            "Sustained high CPU usage detected. Consider checking background processes or running a system scan.",
          );
        }

        // Example: Low disk space
        const lastLog = logs[logs.length - 1];
        if (
          lastLog &&
          lastLog.totalDisk > 0 &&
          (lastLog.totalDisk - lastLog.diskUsage) / lastLog.totalDisk < 0.1
        ) {
          suggestions.push(
            "Your disk space is running low. Consider cleaning junk files or uninstalling unused applications.",
          );
        }
      }

      // Analyze crash logs (placeholder for more advanced analysis)
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        const crashes: CrashLogEntry[] = JSON.parse(
          await fs.readFile(CRASH_LOG_FILE, "utf-8"),
        );
        if (crashes.length > 5) {
          suggestions.push(
            `Multiple application crashes detected (${crashes.length} in total). This might indicate system instability or problematic software.`,
          );
        }
      }
    } catch (error) {
      console.error("Failed to analyze AI data:", error);
    }

    return suggestions;
  });
}
