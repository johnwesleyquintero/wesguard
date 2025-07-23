import { useState, useEffect, useCallback, useRef } from "react";
import { formatBytes } from "../../../src/utils/formatters";
import { debounce } from "lodash-es";

export interface SystemInfo {
  os: string;
  cpu: string;
  disk?: string; // Add disk information
  totalMemory?: string; // Add total memory information
  uptime?: string;
  architecture?: string;
}

interface Metrics {
  cpu: number;
  mem: number; // Memory usage percentage
  usedMemory?: number; // Used memory in bytes
  diskUsage?: number; // Add disk usage percentage
  netRx?: number; // Network received bytes/s
  netTx?: number; // Network transmitted bytes/s
  temperature?: number; // CPU temperature if available
  batteryLevel?: number; // Battery level for laptops
}

interface HistoricalData {
  cpu: { timestamp: number; value: number }[];
  mem: { timestamp: number; value: number }[];
  disk: { timestamp: number; value: number }[];
  network: { timestamp: number; rx: number; tx: number }[];
}

const MAX_HISTORY_POINTS = 120; // Keep history for 2 minutes
const PERFORMANCE_THRESHOLD = {
  CPU_HIGH: 80,
  MEMORY_HIGH: 85,
  DISK_HIGH: 90,
};

const useSystemInfo = (interval: number = 2000) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({ os: "", cpu: "" });
  const [metrics, setMetrics] = useState<Metrics>({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [performanceAlerts, setPerformanceAlerts] = useState<string[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    mem: [],
    disk: [],
    network: [],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Debounced function to prevent excessive API calls
  const debouncedFetchMetrics = useCallback(
    debounce(async () => {
      try {
        const metricsResponse =
          await window.electronAPI.cleaner.getDiskAndNetworkMetrics();

        if (metricsResponse.error) {
          throw new Error(metricsResponse.error);
        }

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
        
        // Update historical data for disk and network
        setHistoricalData((prev) => {
          const timestamp = Date.now();
          const newDiskHistory = [
            ...prev.disk,
            { timestamp, value: metricsResponse.diskUsage || 0 },
          ];
          const newNetworkHistory = [
            ...prev.network,
            { timestamp, rx: metricsResponse.netRx || 0, tx: metricsResponse.netTx || 0 },
          ];

          // Keep only the last MAX_HISTORY_POINTS
          while (newDiskHistory.length > MAX_HISTORY_POINTS) newDiskHistory.shift();
          while (newNetworkHistory.length > MAX_HISTORY_POINTS) newNetworkHistory.shift();

          return { 
            ...prev, 
            disk: newDiskHistory,
            network: newNetworkHistory,
          };
        });
        
        // Check for performance alerts
        checkPerformanceAlerts(metricsResponse);
        
        setError(null);
        retryCountRef.current = 0;
      } catch (error) {
        console.error("Error fetching disk/network data:", error);
        retryCountRef.current++;
        
        if (retryCountRef.current >= maxRetries) {
          setError(`Failed to fetch system metrics after ${maxRetries} attempts`);
        }
      }
    }, 500), // Debounce by 500ms
    []
  );

  const checkPerformanceAlerts = useCallback((metricsData: any) => {
    const alerts: string[] = [];
    
    if (metricsData.diskUsage > PERFORMANCE_THRESHOLD.DISK_HIGH) {
      alerts.push(`Disk usage is critically high at ${metricsData.diskUsage.toFixed(1)}%`);
    }
    
    // Add more performance checks as needed
    setPerformanceAlerts(alerts);
  }, []);

  const fetchDiskAndNetwork = useCallback(async () => {
    try {
      const metricsResponse =
        await window.electronAPI.cleaner.getDiskAndNetworkMetrics();

      if (metricsResponse.error) {
        throw new Error(metricsResponse.error);
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
        
        setError(null);
        retryCountRef.current = 0;
      }
    } catch (error) {
      console.error("Error fetching disk/network data:", error);
      retryCountRef.current++;
      
      if (retryCountRef.current >= maxRetries) {
        setError(`Failed to fetch system metrics after ${maxRetries} attempts`);
      }
    }
  }, []);

  // Initial fetch for disk and network
  useEffect(() => {
    debouncedFetchMetrics();
  }, [debouncedFetchMetrics]);

  useEffect(() => {
    const startPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(debouncedFetchMetrics, interval);
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

    // Enhanced error handling for system info
    const handleSystemInfoWithRetry = async () => {
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          window.electronAPI.getSystemInfo();
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            setError("Failed to fetch system information");
            setIsLoading(false);
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
          }
        }
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
          setError(info.error);
        } else {
          setSystemInfo({
            ...info,
            totalMemory: info.totalMemory
              ? formatBytes(info.totalMemory)
              : undefined,
          });
          setError(null);
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
        
        // Enhanced historical data tracking
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

          return { 
            ...prev,
            cpu: newCpuHistory, 
            mem: newMemHistory,
          };
        });
        
        // Log performance data for AI analysis
        if (window.electronAPI.aiOptimization) {
          window.electronAPI.aiOptimization.logPerformance({
            timestamp: new Date().toISOString(),
            cpu: newMetrics.cpu,
            mem: newMetrics.mem,
            diskUsage: newMetrics.diskUsage || 0,
            totalDisk: 0, // This would need to be passed from the metrics
            netRx: newMetrics.netRx || 0,
            netTx: newMetrics.netTx || 0,
          });
        }
      };

      // Initial fetch for system info (not polled)
      handleSystemInfoWithRetry();

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
        debouncedFetchMetrics.cancel(); // Cancel any pending debounced calls
      };
    }
  }, [interval, debouncedFetchMetrics]); // Dependencies: interval and debouncedFetchMetrics

  return {
    systemInfo,
    metrics,
    isLoading,
    error,
    performanceAlerts,
    historicalData,
    retryFetch: debouncedFetchMetrics,
  };
};

export default useSystemInfo;