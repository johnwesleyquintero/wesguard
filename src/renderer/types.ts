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

  // Cleaner
  analyzeJunkFiles: () => Promise<{
    files: Array<{
      name: string;
      path: string;
      size: number;
      lastModified: number;
    }>;
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

  // AI Optimization
  aiInitDataDir: () => Promise<void>;
  aiLogPerformance: (data: {
    timestamp: string;
    cpu: number;
    mem: number;
    diskUsage: number;
    totalDisk: number;
    netRx: number;
    netTx: number;
  }) => Promise<void>;
  aiLogCrash: (data: {
    timestamp: string;
    appName: string;
    message: string;
  }) => Promise<void>;
  aiGetSuggestions: () => Promise<string[]>;

  // Memory Optimizer
  memoryInitDataDir: () => Promise<void>;
  memoryGetCurrentUsage: () => Promise<{
    timestamp: string;
    total: number;
    used: number;
    free: number;
    usedPercentage: number;
  }>;
  memoryOptimize: () => Promise<{
    success: boolean;
    suggestions: string[];
    error?: string;
  }>;
  memoryGetHistory: () => Promise<
    Array<{
      timestamp: string;
      total: number;
      used: number;
      free: number;
      usedPercentage: number;
    }>
  >;

  // Registry
  scanRegistry: () => Promise<RegistryItem[]>;
  backupRegistry: (backup: RegistryBackup) => Promise<void>;
  cleanRegistry: (items: RegistryItem[]) => Promise<void>;
  restoreRegistry: (backup: RegistryBackup) => Promise<void>;

  // Reminder
  showReminderNotification: (
    title: string,
    body: string,
    sound: boolean,
  ) => void;

  // Settings
  setSystemMetricsInterval: (interval: number) => void;
}
