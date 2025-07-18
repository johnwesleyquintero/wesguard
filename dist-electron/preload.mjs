"use strict";
const o = require("electron"),
  { contextBridge: r, ipcRenderer: e } = o;
r.exposeInMainWorld("electronAPI", {
  getSystemInfo: () => e.send("get-system-info"),
  onSystemInfoResponse: (t) => {
    const n = (s, i) => t(i);
    return (
      e.on("systemInfoResponse", n),
      () => {
        e.removeListener("systemInfoResponse", n);
      }
    );
  },
  onUpdateMetrics: (t) => {
    const n = (s, i) => t(i);
    return (
      e.on("updateMetrics", n),
      () => {
        e.removeListener("updateMetrics", n);
      }
    );
  },
  analyzeJunkFiles: () => e.invoke("analyze-junk-files"),
  executeCleaning: (t) => e.invoke("execute-cleaning", t),
  getDiskUsage: () => e.invoke("get-disk-usage"),
  getNetworkActivity: () => e.invoke("get-network-activity"),
  showReminderNotification: (t, n, s) =>
    e.send("show-reminder-notification", t, n, s),
  setSystemMetricsInterval: (t) => e.send("set-system-metrics-interval", t),
});
