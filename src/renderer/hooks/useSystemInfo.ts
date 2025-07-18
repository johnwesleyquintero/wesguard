import { useState, useEffect, useCallback } from "react";

interface SystemInfo {
  os: string;
  cpu: string;
  disk?: string; // Add disk information
}

interface Metrics {
  cpu: number;
  mem: number;
  diskUsage?: number; // Add disk usage percentage
  netRx?: number; // Network received bytes/s
  netTx?: number; // Network transmitted bytes/s
}

interface HistoricalData {
  cpu: { timestamp: number; value: number }[];
  mem: { timestamp: number; value: number }[];
}

const MAX_HISTORY_POINTS = 60; // Keep history for 60 seconds (assuming 1-second interval)

const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({ os: "", cpu: "" });
  const [metrics, setMetrics] = useState<Metrics>({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [updateInterval, setUpdateInterval] = useState(2000); // Default to 2 seconds
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    mem: [],
  });

  useEffect(() => {
    if (window.electronAPI) {
      const handleSystemInfo = (info: SystemInfo & { error?: string }) => {
        if (info.error) {
          console.error("Error from main process (system info):", info.error);
        } else {
          setSystemInfo(info);
        }
        setIsLoading(false);
      };

      const handleUpdateMetrics = (newMetrics: Metrics) => {
        setMetrics(newMetrics);
        setHistoricalData((prev) => {
          const timestamp = Date.now();
          const newCpuHistory = [
            ...prev.cpu,
            { timestamp, value: newMetrics.cpu },
          ];
          const newMemHistory = [
            ...prev.mem,
            { timestamp, value: newMetrics.mem },
          ];

          // Keep only the last MAX_HISTORY_POINTS
          while (newCpuHistory.length > MAX_HISTORY_POINTS)
            newCpuHistory.shift();
          while (newMemHistory.length > MAX_HISTORY_POINTS)
            newMemHistory.shift();

          return { cpu: newCpuHistory, mem: newMemHistory };
        });
      };

      const fetchDiskAndNetwork = async () => {
        try {
          const diskResponse = await window.electronAPI.getDiskUsage();
          if (diskResponse.error) {
            console.error("Error fetching disk usage:", diskResponse.error);
          } else {
            setMetrics((prev) => ({
              ...prev,
              diskUsage: diskResponse.diskUsage,
            }));
            setSystemInfo((prev) => ({
              ...prev,
              disk: formatBytes(diskResponse.totalDisk),
            }));
          }

          const networkResponse = await window.electronAPI.getNetworkActivity();
          if (networkResponse.error) {
            console.error(
              "Error fetching network activity:",
              networkResponse.error,
            );
          } else {
            setMetrics((prev) => ({
              ...prev,
              netRx: networkResponse.netRx,
              netTx: networkResponse.netTx,
            }));
          }
        } catch (error) {
          console.error("Error fetching disk/network data:", error);
        }
      };

      // Initial fetch
      window.electronAPI.getSystemInfo();
      fetchDiskAndNetwork();

      // Set up listeners
      const removeSystemInfoListener =
        window.electronAPI.onSystemInfoResponse(handleSystemInfo);
      const removeUpdateMetricsListener =
        window.electronAPI.onUpdateMetrics(handleUpdateMetrics);

      // Set up polling for disk and network activity
      const intervalId = setInterval(fetchDiskAndNetwork, updateInterval);

      // Cleanup listeners and interval on unmount
      return () => {
        removeSystemInfoListener();
        removeUpdateMetricsListener();
        clearInterval(intervalId);
      };
    }
  }, [updateInterval]); // Depend on updateInterval to re-create interval if it changes

  // Function to format bytes (can be moved to a utility file if needed elsewhere)
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const setMetricsUpdateInterval = useCallback((interval: number) => {
    setUpdateInterval(interval);
    if (window.electronAPI) {
      window.electronAPI.setSystemMetricsInterval(interval);
    }
  }, []);

  return {
    systemInfo,
    metrics,
    isLoading,
    setMetricsUpdateInterval,
    updateInterval,
    historicalData,
  };
};

export default useSystemInfo;
