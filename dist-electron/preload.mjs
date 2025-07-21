"use strict";
const s = require("electron"),
  { contextBridge: o, ipcRenderer: e } = s;
o.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => e.send("get-system-info"),
  onSystemInfoResponse: (i) => {
    const t = (n, r) => i(r);
    return (
      e.on("systemInfoResponse", t),
      () => {
        e.removeListener("systemInfoResponse", t);
      }
    );
  },
  onUpdateMetrics: (i) => {
    const t = (n, r) => i(r);
    return (
      e.on("updateMetrics", t),
      () => {
        e.removeListener("updateMetrics", t);
      }
    );
  },
  cleaner: {
    analyzeJunkFiles: () => e.invoke("analyze-junk-files"),
    executeCleaning: (i) => e.invoke("execute-cleaning", i),
    getDiskAndNetworkMetrics: () => e.invoke("get-disk-and-network-metrics"),
  },
  reminder: {
    showReminderNotification: (i, t, n) =>
      e.send("show-reminder-notification", i, t, n),
  },
  settings: {
    setSystemMetricsInterval: (i) => e.send("set-system-metrics-interval", i),
  },
  registry: {
    scan: () => e.invoke("scan-registry"),
    backup: (i) => e.invoke("backup-registry", i),
    clean: (i) => e.invoke("clean-registry", i),
    restore: (i) => e.invoke("restore-registry", i),
  },
  aiOptimization: {
    initDataDir: () => e.invoke("ai-init-data-dir"),
    logPerformance: (i) => e.invoke("ai-log-performance", i),
    logCrash: (i) => e.invoke("ai-log-crash", i),
    getSuggestions: () => e.invoke("ai-get-suggestions"),
  },
  memoryOptimizer: {
    initDataDir: () => e.invoke("memory-init-data-dir"),
    getCurrentUsage: () => e.invoke("memory-get-current-usage"),
    optimize: () => e.invoke("memory-optimize"),
    getHistory: () => e.invoke("memory-get-history"),
  },
});
