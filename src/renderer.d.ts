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
      analyzeJunkFiles: () => Promise<number>;
      executeCleaning: () => Promise<{ success: boolean }>;
    };
  }
}
