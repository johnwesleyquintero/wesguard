import { contextBridge, ipcRenderer } from "electron";

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
  executeCleaning: () => ipcRenderer.invoke("execute-cleaning"),
});
