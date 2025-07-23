export type RegistryValueType =
  | "REG_SZ"
  | "REG_EXPAND_SZ"
  | "REG_DWORD"
  | "REG_QWORD"
  | "REG_MULTI_SZ"
  | "REG_BINARY";

export interface RegistryItem {
  path: string;
  value: string;
  type: RegistryValueType;
  isInvalid: boolean;
  name: string;
}

export interface RegistryBackup {
  timestamp: string;
  items: RegistryItem[];
}

export interface ElectronAPI {
  // System Info
  getSystemInfo: () => void;
  onSystemInfoResponse: (
    callback: (info: { os: string; cpu: string }) => void,
  ) => () => void;
  onUpdateMetrics: (
    callback: (metrics: { cpu: number; mem: number }) => void,
  ) => () => void;
  setSystemMetricsInterval: (interval: number) => void; // Moved from settings

  // Cleaner
  cleaner: {
    analyzeJunkFiles: () => Promise<{
      files: JunkFile[];
      totalSize: number;
    }>;
    executeCleaning: (
      filesToDelete: string[],
    ) => Promise<{ success: boolean; message?: string; error?: string }>;
    getDiskUsage: () => Promise<
      { diskUsage: number; totalDisk: number } | { error: string }
    >;
    getNetworkActivity: () => Promise<
      { netRx: number; netTx: number } | { error: string }
    >;
  };

  // Reminder
  reminder: {
    showReminderNotification: (
      title: string,
      body: string,
      sound: boolean,
    ) => void;
  };

  // Registry
  registry: {
    scan: () => Promise<RegistryItem[]>;
    backup: (backup: RegistryBackup) => Promise<void>;
    clean: (items: RegistryItem[]) => Promise<void>;
    restore: (backup: RegistryBackup) => Promise<void>;
  };

  // AI Optimization
  aiOptimization: {
    initDataDir: () => Promise<void>;
    logPerformance: (data: {
      timestamp: string;
      cpu: number;
      mem: number;
      diskUsage: number;
      totalDisk: number;
      netRx: number;
      netTx: number;
    }) => Promise<void>;
    logCrash: (data: {
      timestamp: string;
      appName: string;
      message: string;
    }) => Promise<void>;
    getSuggestions: () => Promise<string[]>;
  };

  // Memory Optimizer
  memoryOptimizer: {
    initDataDir: () => Promise<void>;
    getCurrentUsage: () => Promise<{
      timestamp: string;
      total: number;
      used: number;
      free: number;
      usedPercentage: number;
    }>;
    optimize: () => Promise<{
      success: boolean;
      suggestions: string[];
      error?: string;
    }>;
    getHistory: () => Promise<
      Array<{
        timestamp: string;
        total: number;
        used: number;
        free: number;
        usedPercentage: number;
      }>
    >;
  };
}

export interface SystemInfo {
  os: string;
  cpu: string;
  disk?: string; // Made optional
}

export interface JunkFile {
  name: string;
  path: string;
  size: number;
  lastModified: number;
  category?: "temp" | "cache" | "logs" | "downloads" | "other";
  risk?: "safe" | "caution" | "review";
  description?: string;
}
