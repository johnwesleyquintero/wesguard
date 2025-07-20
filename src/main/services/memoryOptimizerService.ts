import { app } from 'electron';
import si from 'systeminformation';
import fs from 'fs-extra';
import path from 'path';

const DATA_DIR = path.join(app.getPath('userData'), 'memory-data');
const MEMORY_LOG_FILE = path.join(DATA_DIR, 'memory_usage.json');

interface MemoryUsageLogEntry {
  timestamp: string;
  total: number;
  used: number;
  free: number;
  usedPercentage: number;
}

export const memoryOptimizerService = {
  initDataDir: async () => {
    await fs.ensureDir(DATA_DIR);
  },

  logUsage: async (data: MemoryUsageLogEntry) => {
    try {
      let logs: MemoryUsageLogEntry[] = [];
      if (await fs.pathExists(MEMORY_LOG_FILE)) {
        logs = JSON.parse(await fs.readFile(MEMORY_LOG_FILE, 'utf-8'));
      }
      logs.push(data);
      if (logs.length > 1000) {
        logs = logs.slice(logs.length - 1000);
      }
      await fs.writeFile(MEMORY_LOG_FILE, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error('Failed to log memory usage data:', error);
    }
  },

  getCurrentUsage: async (): Promise<MemoryUsageLogEntry> => {
    try {
      const memData = await si.mem();
      const logEntry: MemoryUsageLogEntry = {
        timestamp: new Date().toISOString(),
        total: memData.total,
        used: memData.used,
        free: memData.free,
        usedPercentage: parseFloat(
          ((memData.used / memData.total) * 100).toFixed(2)
        ),
      };
      return logEntry;
    } catch (error) {
      console.error('Failed to get current memory usage:', error);
      throw error;
    }
  },

  optimize: async () => {
    const suggestions: string[] = [];
    try {
      const memData = await si.mem();
      const usedPercentage = parseFloat(
        ((memData.used / memData.total) * 100).toFixed(2)
      );

      if (usedPercentage > 85) {
        suggestions.push(
          'High memory usage detected. Consider closing unused applications to free up RAM.'
        );
      } else {
        suggestions.push('Memory usage is within normal limits.');
      }

      suggestions.push(
        'Regularly check for applications with potential memory leaks.'
      );

      return { success: true, suggestions: suggestions };
    } catch (error) {
      console.error('Failed to optimize memory:', error);
      return {
        success: false,
        error: (error as Error).message || 'Failed to optimize memory.',
      };
    }
  },

  getHistory: async (): Promise<MemoryUsageLogEntry[]> => {
    try {
      if (await fs.pathExists(MEMORY_LOG_FILE)) {
        const logs: MemoryUsageLogEntry[] = JSON.parse(
          await fs.readFile(MEMORY_LOG_FILE, 'utf-8')
        );
        return logs;
      }
      return [];
    } catch (error) {
      console.error('Failed to get memory usage history:', error);
      return [];
    }
  },
};
