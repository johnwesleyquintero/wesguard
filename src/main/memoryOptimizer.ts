import { ipcMain, app } from "electron";
import si from "systeminformation";
import fs from "fs-extra";
import path from "path";

const DATA_DIR = path.join(app.getPath("userData"), "memory-data");
const MEMORY_LOG_FILE = path.join(DATA_DIR, "memory_usage.json");

interface MemoryUsageLogEntry {
  timestamp: string;
  total: number;
  used: number;
  free: number;
  usedPercentage: number;
}

export function initMemoryOptimizerHandlers() {
  // Ensure data directory exists
  ipcMain.handle("memory-init-data-dir", async () => {
    await fs.ensureDir(DATA_DIR);
  });

  // Log memory usage
  ipcMain.handle("memory-log-usage", async (_, data: MemoryUsageLogEntry) => {
    try {
      let logs: MemoryUsageLogEntry[] = [];
      if (await fs.pathExists(MEMORY_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(MEMORY_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      // Keep only the last 1000 entries
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(MEMORY_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log memory usage data:", error);
    }
  });

  // Get current memory usage
  ipcMain.handle("memory-get-current-usage", async () => {
    try {
      const memData = await si.mem();
      const logEntry: MemoryUsageLogEntry = {
        timestamp: new Date().toISOString(),
        total: memData.total,
        used: memData.used,
        free: memData.free,
        usedPercentage: parseFloat(
          ((memData.used / memData.total) * 100).toFixed(2),
        ),
      };
      // Log this usage data for future analysis
      // Use ipcMain.emit for logging, as ipcMain.handle is for request/response
      ipcMain.emit("memory-log-usage", logEntry);
      return logEntry;
    } catch (error) {
      console.error("Failed to get current memory usage:", error);
      throw error; // Re-throw to be caught by renderer
    }
  });

  // Optimize memory (basic implementation: suggests closing apps)
  // Actual memory optimization is complex and OS-dependent.
  // This function will simulate optimization by suggesting actions.
  ipcMain.handle("memory-optimize", async () => {
    const suggestions: string[] = [];
    try {
      const memData = await si.mem();
      const usedPercentage = parseFloat(
        ((memData.used / memData.total) * 100).toFixed(2),
      );

      if (usedPercentage > 85) {
        suggestions.push(
          "High memory usage detected. Consider closing unused applications to free up RAM.",
        );
        // In a real scenario, you might try to identify memory-hungry processes
        // and offer to terminate them, but this requires more advanced permissions
        // and careful handling.
      } else {
        suggestions.push("Memory usage is within normal limits.");
      }

      // Example: Suggest checking for memory leaks in applications
      // This would require more sophisticated profiling tools.
      suggestions.push(
        "Regularly check for applications with potential memory leaks.",
      );

      return { success: true, suggestions: suggestions };
    } catch (error) {
      console.error("Failed to optimize memory:", error);
      // Type assertion for error to access message property
      return {
        success: false,
        error: (error as Error).message || "Failed to optimize memory.",
      };
    }
  });

  // Get historical memory usage data
  ipcMain.handle("memory-get-history", async () => {
    try {
      if (await fs.pathExists(MEMORY_LOG_FILE)) {
        const logs: MemoryUsageLogEntry[] = JSON.parse(
          await fs.readFile(MEMORY_LOG_FILE, "utf-8"),
        );
        return logs;
      }
      return [];
    } catch (error) {
      console.error("Failed to get memory usage history:", error);
      return [];
    }
  });
}
