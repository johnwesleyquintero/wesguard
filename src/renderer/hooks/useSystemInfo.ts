import { useState, useEffect, useCallback, useRef } from "react";
import { formatBytes } from "../../../src/utils/formatters";

export interface SystemInfo {
  os: string;
  cpu: string;
  disk?: string; // Add disk information
  totalMemory?: string; // Add total memory information
}

interface Metrics {
  cpu: number;
  mem: number; // Memory usage percentage
  usedMemory?: number; // Used memory in bytes
  diskUsage?: number; // Add disk usage percentage
  netRx?: number; // Network received bytes/s
  netTx?: number; // Network transmitted bytes/s
}

interface HistoricalData {
  cpu: { timestamp: number; value: number }[];
  mem: { timestamp: number; value: number }[];
}

const MAX_HISTORY_POINTS = 60; // Keep history for 60 seconds (assuming 1-second interval)

const useSystemInfo = (interval: number = 2000) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({ os: "", cpu: "" });
  const [metrics, setMetrics] = useState<Metrics>({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    mem: [],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchDiskAndNetwork = useCallback(async () => {
    try {
      const metricsResponse =
        await window.electronAPI.cleaner.getDiskAndNetworkMetrics();

      if (metricsResponse.error) {
        console.error(
          "Error fetching disk and network metrics:",
          metricsResponse.error,
        );
      } else {
        setMetrics((prev) => ({
          ...prev,
          diskUsage: metricsResponse.diskUsage,
          netRx: metricsResponse.netRx,
          netTx: metricsResponse.netTx,
        }));
        setSystemInfo((prev) => ({
          ...prev,
          disk: metricsResponse.totalDisk
            ? formatBytes(metricsResponse.totalDisk)
            : undefined,
        }));
      }
    } catch (error) {
      console.error("Error fetching disk/network data:", error);
    }
  }, []);

  // Initial fetch for disk and network
  useEffect(() => {
    fetchDiskAndNetwork();
  }, [fetchDiskAndNetwork]);

  useEffect(() => {
    const startPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(fetchDiskAndNetwork, interval);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopPolling();
      } else {
        startPolling();
      }
    };

    // Set up initial polling based on visibility
    if (document.visibilityState === "visible") {
      startPolling();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (window.electronAPI) {
      const handleSystemInfo = (
        info: SystemInfo & { error?: string; totalMemory?: number },
      ) => {
        if (info.error) {
          console.error("Error from main process (system info):", info.error);
        } else {
          setSystemInfo({
            ...info,
            totalMemory: info.totalMemory
              ? formatBytes(info.totalMemory)
              : undefined,
          });
        }
        setIsLoading(false);
      };

      const handleUpdateMetrics = (
        newMetrics: Metrics & { usedMemory?: number },
      ) => {
        setMetrics((prev) => ({
          ...prev,
          ...newMetrics,
          usedMemory: newMetrics.usedMemory,
        }));
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

      // Initial fetch for system info (not polled)
      window.electronAPI.getSystemInfo();

      // Set up listeners for system info and metrics updates
      const removeSystemInfoListener =
        window.electronAPI.onSystemInfoResponse(handleSystemInfo);
      const removeUpdateMetricsListener =
        window.electronAPI.onUpdateMetrics(handleUpdateMetrics);

      // Cleanup listeners and interval on unmount
      return () => {
        removeSystemInfoListener();
        removeUpdateMetricsListener();
        stopPolling(); // Ensure interval is cleared on unmount
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      };
    }
  }, [interval, fetchDiskAndNetwork]); // Dependencies: interval and fetchDiskAndNetwork

  return {
    systemInfo,
    metrics,
    isLoading,
    historicalData,
  };
};

export default useSystemInfo;
