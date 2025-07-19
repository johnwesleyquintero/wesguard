import { app } from "electron";
import fs from "fs-extra";
import path from "path";

const DATA_DIR = path.join(app.getPath("userData"), "ai-data");
const PERFORMANCE_LOG_FILE = path.join(DATA_DIR, "performance.json");
const CRASH_LOG_FILE = path.join(DATA_DIR, "crashes.json");
const APP_USAGE_LOG_FILE = path.join(DATA_DIR, "app-usage.json");
const SYSTEM_EVENT_LOG_FILE = path.join(DATA_DIR, "system-events.json");

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

interface AppUsageLogEntry {
  timestamp: string;
  appName: string;
  duration: number; // in seconds
}

interface SystemEventLogEntry {
  timestamp: string;
  eventName: string;
  details: Record<string, unknown>;
}

export const aiOptimizationService = {
  initDataDir: async () => {
    await fs.ensureDir(DATA_DIR);
  },

  logPerformance: async (data: PerformanceLogEntry) => {
    try {
      let logs: PerformanceLogEntry[] = [];
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(PERFORMANCE_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log performance data:", error);
    }
  },

  logCrash: async (data: CrashLogEntry) => {
    try {
      let logs: CrashLogEntry[] = [];
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(CRASH_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      if (logs.length > 100) {
        logs = logs.slice(logs.length - 100);
      }
      await fs.writeFile(CRASH_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log crash data:", error);
    }
  },

  logAppUsage: async (data: AppUsageLogEntry) => {
    try {
      let logs: AppUsageLogEntry[] = [];
      if (await fs.pathExists(APP_USAGE_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(APP_USAGE_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(APP_USAGE_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log app usage data:", error);
    }
  },

  logSystemEvent: async (data: SystemEventLogEntry) => {
    try {
      let logs: SystemEventLogEntry[] = [];
      if (await fs.pathExists(SYSTEM_EVENT_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(SYSTEM_EVENT_LOG_FILE, "utf-8"));
      }
      logs.push(data);
      if (logs.length > 500) {
        logs = logs.slice(logs.length - 500);
      }
      await fs.writeFile(SYSTEM_EVENT_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log system event data:", error);
    }
  },

  getSuggestions: async (): Promise<string[]> => {
    const suggestions: string[] = [];

    try {
      // Analyze performance logs
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        const logs: PerformanceLogEntry[] = JSON.parse(
          await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"),
        );
        const recentLogs = logs.slice(-50);

        const highCpuCount = recentLogs.filter((log) => log.cpu > 80).length;
        if (highCpuCount > 10) {
          suggestions.push(
            "Sustained high CPU usage detected. Consider checking background processes or running a system scan.",
          );
        }

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

      // Analyze crash logs
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        const crashes: CrashLogEntry[] = JSON.parse(
          await fs.readFile(CRASH_LOG_FILE, "utf-8"),
        );
        if (crashes.length > 5) {
          const appName = crashes[crashes.length - 1].appName;
          suggestions.push(
            `Multiple application crashes detected for ${appName}. This might indicate system instability or problematic software.`,
          );
        }
      }

      // Analyze app usage logs
      if (await fs.pathExists(APP_USAGE_LOG_FILE)) {
        const usageLogs: AppUsageLogEntry[] = JSON.parse(
          await fs.readFile(APP_USAGE_LOG_FILE, "utf-8"),
        );
        const appDurations = usageLogs.reduce(
          (acc, log) => {
            acc[log.appName] = (acc[log.appName] || 0) + log.duration;
            return acc;
          },
          {} as Record<string, number>,
        );

        const sortedApps = Object.entries(appDurations).sort(
          (a, b) => b[1] - a[1],
        );
        if (sortedApps.length > 0) {
          const heaviestApp = sortedApps[0][0];
          suggestions.push(
            `The application '${heaviestApp}' is consuming the most resources. If you are not using it, consider closing it to improve performance.`,
          );
        }
      }
    } catch (error) {
      console.error("Failed to analyze AI data:", error);
    }

    return suggestions;
  },
};
