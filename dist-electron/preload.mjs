"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => electron.ipcRenderer.send("get-system-info"),
  onSystemInfoResponse: (callback) => {
    const listener = (_event, value) => callback(value);
    electron.ipcRenderer.on("systemInfoResponse", listener);
    return () => {
      electron.ipcRenderer.removeListener("systemInfoResponse", listener);
    };
  },
  onUpdateMetrics: (callback) => {
    const listener = (_event, value) => callback(value);
    electron.ipcRenderer.on("updateMetrics", listener);
    return () => {
      electron.ipcRenderer.removeListener("updateMetrics", listener);
    };
  },
  // Cleaner API
  analyzeJunkFiles: () => electron.ipcRenderer.invoke("analyze-junk-files"),
  executeCleaning: () => electron.ipcRenderer.invoke("execute-cleaning")
});
