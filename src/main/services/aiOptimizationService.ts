import { app } from "electron";
import fs from "fs-extra";
import path from "path";
import { performance } from "perf_hooks";

const DATA_DIR = path.join(app.getPath("userData"), "ai-data");
const PERFORMANCE_LOG_FILE = path.join(DATA_DIR, "performance.json");
const CRASH_LOG_FILE = path.join(DATA_DIR, "crashes.json");
const APP_USAGE_LOG_FILE = path.join(DATA_DIR, "app-usage.json");
const SYSTEM_EVENT_LOG_FILE = path.join(DATA_DIR, "system-events.json");
const OPTIMIZATION_CACHE_FILE = path.join(DATA_DIR, "optimization-cache.json");

interface PerformanceLogEntry {
  timestamp: string;
  cpu: number;
  mem: number;
  diskUsage: number;
  totalDisk: number;
  netRx: number;
  netTx: number;
  responseTime?: number;
  memoryLeaks?: boolean;
}

interface CrashLogEntry {
  timestamp: string;
  appName: string;
  message: string;
  stackTrace?: string;
  severity: "low" | "medium" | "high" | "critical";
}

interface AppUsageLogEntry {
  timestamp: string;
  appName: string;
  duration: number; // in seconds
  cpuUsage?: number;
  memoryUsage?: number;
}

interface SystemEventLogEntry {
  timestamp: string;
  eventName: string;
  details: Record<string, unknown>;
  impact: "none" | "low" | "medium" | "high";
}

interface OptimizationCache {
  lastAnalysis: string;
  suggestions: string[];
  performanceScore: number;
  trends: {
    cpu: "improving" | "stable" | "degrading";
    memory: "improving" | "stable" | "degrading";
    disk: "improving" | "stable" | "degrading";
  };
}

class AIOptimizationService {
  private cache: OptimizationCache | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private async loadCache(): Promise<OptimizationCache | null> {
    try {
      if (await fs.pathExists(OPTIMIZATION_CACHE_FILE)) {
        const cacheData = JSON.parse(await fs.readFile(OPTIMIZATION_CACHE_FILE, "utf-8"));
        const cacheAge = Date.now() - new Date(cacheData.lastAnalysis).getTime();
        
        if (cacheAge < this.CACHE_DURATION) {
          return cacheData;
        }
      }
    } catch (error) {
      console.error("Failed to load optimization cache:", error);
    }
    return null;
  }

  private async saveCache(cache: OptimizationCache): Promise<void> {
    try {
      await fs.writeFile(OPTIMIZATION_CACHE_FILE, JSON.stringify(cache, null, 2));
    } catch (error) {
      console.error("Failed to save optimization cache:", error);
    }
  }

  private calculatePerformanceScore(logs: PerformanceLogEntry[]): number {
    if (logs.length === 0) return 100;
    
    const recent = logs.slice(-10);
    const avgCpu = recent.reduce((sum, log) => sum + log.cpu, 0) / recent.length;
    const avgMem = recent.reduce((sum, log) => sum + log.mem, 0) / recent.length;
    const avgDisk = recent.reduce((sum, log) => sum + (log.diskUsage || 0), 0) / recent.length;
    
    // Score based on resource usage (lower is better)
    const cpuScore = Math.max(0, 100 - avgCpu);
    const memScore = Math.max(0, 100 - avgMem);
    const diskScore = Math.max(0, 100 - avgDisk);
    
    return Math.round((cpuScore + memScore + diskScore) / 3);
  }

  private analyzeTrends(logs: PerformanceLogEntry[]): OptimizationCache["trends"] {
    if (logs.length < 10) {
      return { cpu: "stable", memory: "stable", disk: "stable" };
    }
    
    const recent = logs.slice(-5);
    const older = logs.slice(-10, -5);
    
    const avgRecentCpu = recent.reduce((sum, log) => sum + log.cpu, 0) / recent.length;
    const avgOlderCpu = older.reduce((sum, log) => sum + log.cpu, 0) / older.length;
    
    const avgRecentMem = recent.reduce((sum, log) => sum + log.mem, 0) / recent.length;
    const avgOlderMem = older.reduce((sum, log) => sum + log.mem, 0) / older.length;
    
    const avgRecentDisk = recent.reduce((sum, log) => sum + (log.diskUsage || 0), 0) / recent.length;
    const avgOlderDisk = older.reduce((sum, log) => sum + (log.diskUsage || 0), 0) / older.length;
    
    const getTrend = (recent: number, older: number) => {
      const diff = recent - older;
      if (diff > 5) return "degrading";
      if (diff < -5) return "improving";
      return "stable";
    };
    
    return {
      cpu: getTrend(avgRecentCpu, avgOlderCpu),
      memory: getTrend(avgRecentMem, avgOlderMem),
      disk: getTrend(avgRecentDisk, avgOlderDisk),
    };
  }
  async initDataDir(): Promise<void> {
    await fs.ensureDir(DATA_DIR);
  }

  async logPerformance(data: PerformanceLogEntry): Promise<void> {
    const startTime = performance.now();
    try {
      let logs: PerformanceLogEntry[] = [];
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"));
      }
      
      const enhancedData = {
        ...data,
        responseTime: performance.now() - startTime,
        memoryLeaks: data.mem > 90, // Flag potential memory leaks
      };
      
      logs.push(enhancedData);
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(PERFORMANCE_LOG_FILE, JSON.stringify(logs, null, 2));
      
      // Invalidate cache when new performance data is logged
      this.cache = null;
    } catch (error) {
      console.error("Failed to log performance data:", error);
    }
  }

  async logCrash(data: CrashLogEntry): Promise<void> {
    try {
      let logs: CrashLogEntry[] = [];
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(CRASH_LOG_FILE, "utf-8"));
      }
      
      const enhancedData = {
        ...data,
        severity: this.determineCrashSeverity(data.message),
      };
      
      logs.push(enhancedData);
      if (logs.length > 100) {
        logs = logs.slice(logs.length - 100);
      }
      await fs.writeFile(CRASH_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error("Failed to log crash data:", error);
    }
  }

  private determineCrashSeverity(message: string): CrashLogEntry["severity"] {
    const criticalKeywords = ["segmentation fault", "access violation", "kernel panic"];
    const highKeywords = ["out of memory", "stack overflow", "deadlock"];
    const mediumKeywords = ["timeout", "connection lost", "file not found"];
    
    const lowerMessage = message.toLowerCase();
    
    if (criticalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "critical";
    }
    if (highKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "high";
    }
    if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "medium";
    }
    return "low";
  }

  async logAppUsage(data: AppUsageLogEntry): Promise<void> {
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
  }

  async logSystemEvent(data: SystemEventLogEntry): Promise<void> {
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
  }

  async getSuggestions(): Promise<string[]> {
    // Check cache first
    this.cache = await this.loadCache();
    if (this.cache) {
      return this.cache.suggestions;
    }
    
    const suggestions: string[] = [];

    try {
      // Analyze performance logs
      if (await fs.pathExists(PERFORMANCE_LOG_FILE)) {
        const logs: PerformanceLogEntry[] = JSON.parse(
          await fs.readFile(PERFORMANCE_LOG_FILE, "utf-8"),
        );
        const recentLogs = logs.slice(-50);

        const highCpuCount = recentLogs.filter((log) => log.cpu > 80).length;
        const highMemCount = recentLogs.filter((log) => log.mem > 85).length;
        const memoryLeaks = recentLogs.filter((log) => log.memoryLeaks).length;
        
        if (highCpuCount > 10) {
          suggestions.push(
            "Sustained high CPU usage detected. Consider checking background processes or running a system scan.",
          );
        }
        
        if (highMemCount > 10) {
          suggestions.push(
            "High memory usage detected consistently. Consider closing unused applications or increasing RAM.",
          );
        }
        
        if (memoryLeaks > 5) {
          suggestions.push(
            "Potential memory leaks detected. Restart applications that have been running for extended periods.",
          );
        }

        const lastLog = logs[logs.length - 1];
        if (
          lastLog &&
          lastLog.totalDisk > 0 &&
          lastLog.diskUsage > 90
        ) {
          suggestions.push(
            "Your disk space is running low. Consider cleaning junk files or uninstalling unused applications.",
          );
        }
        
        // Performance score and trends
        const performanceScore = this.calculatePerformanceScore(logs);
        const trends = this.analyzeTrends(logs);
        
        if (performanceScore < 60) {
          suggestions.push(
            `System performance score is ${performanceScore}/100. Consider optimizing your system for better performance.`,
          );
        }
        
        if (trends.cpu === "degrading") {
          suggestions.push("CPU performance is degrading over time. Check for resource-intensive processes.");
        }
        
        if (trends.memory === "degrading") {
          suggestions.push("Memory usage is increasing over time. Consider restarting applications periodically.");
        }
        
        // Create and save cache
        this.cache = {
          lastAnalysis: new Date().toISOString(),
          suggestions: [...suggestions],
          performanceScore,
          trends,
        };
        
        await this.saveCache(this.cache);
      }

      // Analyze crash logs
      if (await fs.pathExists(CRASH_LOG_FILE)) {
        const crashes: CrashLogEntry[] = JSON.parse(
          await fs.readFile(CRASH_LOG_FILE, "utf-8"),
        );
        
        const recentCrashes = crashes.filter(
          crash => Date.now() - new Date(crash.timestamp).getTime() < 24 * 60 * 60 * 1000
        );
        
        const criticalCrashes = crashes.filter(crash => crash.severity === "critical").length;
        
        if (recentCrashes.length > 3) {
          const appName = crashes[crashes.length - 1].appName;
          suggestions.push(
            `${recentCrashes.length} application crashes detected in the last 24 hours for ${appName}. Consider updating or reinstalling the application.`,
          );
        }
        
        if (criticalCrashes > 0) {
          suggestions.push(
            `${criticalCrashes} critical system crashes detected. Run a comprehensive system diagnostic.`,
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
          const usage = Math.round(sortedApps[0][1] / 3600); // Convert to hours
          suggestions.push(
            `The application '${heaviestApp}' has been running for ${usage} hours total. If you're not actively using it, consider closing it to improve performance.`,
          );
        }
      }
      
      // Add general optimization suggestions if no specific issues found
      if (suggestions.length === 0) {
        suggestions.push(
          "Your system is running well! Consider running a disk cleanup and updating your software to maintain optimal performance.",
        );
      }
    } catch (error) {
      console.error("Failed to analyze AI data:", error);
      suggestions.push("Unable to analyze system data. Please check system logs for errors.");
    }

    return suggestions;
  }
}

export const aiOptimizationService = new AIOptimizationService();
