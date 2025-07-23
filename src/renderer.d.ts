import type {
  RegistryItem,
  RegistryBackup,
  AISuggestion,
  AIPerformanceLog,
  JunkFile,
  MemoryUsage,
  MemoryOptimizationHistory,
} from "./renderer/types";

export {};

declare global {
  interface Window {
    electronAPI: {
      getSystemInfo: () => void;
      onSystemInfoResponse: (
        callback: (info: { os: string; cpu: string }) => void,
      ) => () => void;
      onUpdateMetrics: (
        callback: (metrics: { cpu: number; mem: number }) => void,
      ) => () => void;
      showReminderNotification: (
        title: string,
        body: string,
        sound: boolean,
      ) => void;
      setSystemMetricsInterval: (interval: number) => void;
      aiOptimization: {
        optimizeAI: () => Promise<void>;
        getSuggestions: () => Promise<AISuggestion[]>;
        initDataDir: () => Promise<void>;
      };
      logPerformance: (data: AIPerformanceLog) => Promise<void>;
      logCrash: (error: string, stack: string) => Promise<void>;
      registry: {
        scan: () => Promise<RegistryItem[]>;
        backup: (backup: RegistryBackup) => Promise<void>;
        clean: (items: RegistryItem[]) => Promise<void>;
        restore: (backup: RegistryBackup) => Promise<void>;
      };
      memoryOptimizer: {
        optimizeMemory: () => Promise<{
          success: boolean;
          suggestions?: string[];
          error?: string;
        }>;
        getCurrentUsage: () => Promise<MemoryUsage>;
        getHistory: () => Promise<MemoryOptimizationHistory[]>;
        initDataDir: () => Promise<void>;
      };
      cleaner: {
        analyzeJunkFiles: () => Promise<{
          files: JunkFile[];
          totalSize: number;
          error?: string;
        }>;
        executeCleaning: (
          filesToDelete: string[],
        ) => Promise<{ success: boolean; error?: string; message?: string }>;
        getDiskAndNetworkMetrics: () => Promise<{
          diskUsage: number;
          totalDisk: number;
          netRx: number;
          netTx: number;
          error?: string;
        }>;
        fetchDiskAndNetwork: () => Promise<{
          diskUsage: number;
          totalDisk: number;
          netRx: number;
          netTx: number;
          error?: string;
        }>;
      };
      reminder: {
        showReminderNotification: (
          title: string,
          body: string,
          sound: boolean,
        ) => void;
      };
    };
  }
}
