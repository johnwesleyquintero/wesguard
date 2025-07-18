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
      analyzeJunkFiles: () => Promise<{
        files: {
          name: string;
          path: string;
          size: number;
          lastModified: number;
        }[];
        totalSize: number;
        error?: string;
      }>;
      executeCleaning: (
        filesToDelete: string[],
      ) => Promise<{ success: boolean; error?: string; message?: string }>;
      getDiskUsage: () => Promise<{
        diskUsage: number;
        totalDisk: number;
        error?: string;
      }>;
      getNetworkActivity: () => Promise<{
        netRx: number;
        netTx: number;
        error?: string;
      }>;
      showReminderNotification: (
        title: string,
        body: string,
        sound: boolean,
      ) => void;
      setSystemMetricsInterval: (interval: number) => void;
    };
  }
}
