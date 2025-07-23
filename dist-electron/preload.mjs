"use strict";
const require$$0 = require("electron");
const { contextBridge, ipcRenderer } = require$$0;
contextBridge.exposeInMainWorld("electronAPI", {
  // System Info API
  getSystemInfo: () => ipcRenderer.send("get-system-info"),
  onSystemInfoResponse: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on("systemInfoResponse", listener);
    return () => {
      ipcRenderer.removeListener("systemInfoResponse", listener);
    };
  },
  onUpdateMetrics: (callback) => {
    const listener = (_event, value) => callback(value);
    ipcRenderer.on("updateMetrics", listener);
    return () => {
      ipcRenderer.removeListener("updateMetrics", listener);
    };
  },
  // Cleaner API
  cleaner: {
    analyzeJunkFiles: () => ipcRenderer.invoke("analyze-junk-files"),
    executeCleaning: (filesToDelete) => ipcRenderer.invoke("execute-cleaning", filesToDelete),
    getDiskAndNetworkMetrics: () => ipcRenderer.invoke("get-disk-and-network-metrics")
  },
  // Reminder API
  reminder: {
    showReminderNotification: (title, body, sound) => ipcRenderer.send("show-reminder-notification", title, body, sound)
  },
  // Settings API
  settings: {
    setSystemMetricsInterval: (interval) => ipcRenderer.send("set-system-metrics-interval", interval)
  },
  // Registry API
  registry: {
    scan: () => ipcRenderer.invoke("scan-registry"),
    backup: (backup) => ipcRenderer.invoke("backup-registry", backup),
    clean: (items) => ipcRenderer.invoke("clean-registry", items),
    restore: (backup) => ipcRenderer.invoke("restore-registry", backup)
  },
  // AI Optimization API
  aiOptimization: {
    initDataDir: () => ipcRenderer.invoke("ai-init-data-dir"),
    logPerformance: (data) => ipcRenderer.invoke("ai-log-performance", data),
    logCrash: (data) => ipcRenderer.invoke("ai-log-crash", data),
    getSuggestions: () => ipcRenderer.invoke("ai-get-suggestions")
  },
  // Memory Optimizer API
  memoryOptimizer: {
    initDataDir: () => ipcRenderer.invoke("memory-init-data-dir"),
    getCurrentUsage: () => ipcRenderer.invoke("memory-get-current-usage"),
    optimize: () => ipcRenderer.invoke("memory-optimize"),
    getHistory: () => ipcRenderer.invoke("memory-get-history")
  }
});
