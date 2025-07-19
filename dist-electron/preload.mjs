"use strict";
const require$$0 = require("electron");
const { contextBridge, ipcRenderer } = require$$0;
contextBridge.exposeInMainWorld("electronAPI", {
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
  analyzeJunkFiles: () => ipcRenderer.invoke("analyze-junk-files"),
  executeCleaning: (filesToDelete) => ipcRenderer.invoke("execute-cleaning", filesToDelete),
  getDiskUsage: () => ipcRenderer.invoke("get-disk-usage"),
  getNetworkActivity: () => ipcRenderer.invoke("get-network-activity"),
  // Reminder API
  showReminderNotification: (title, body, sound) => ipcRenderer.send("show-reminder-notification", title, body, sound),
  // Settings API
  setSystemMetricsInterval: (interval) => ipcRenderer.send("set-system-metrics-interval", interval)
});
