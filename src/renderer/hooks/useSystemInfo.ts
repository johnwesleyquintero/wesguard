import { useState, useEffect, useCallback } from 'react';
import { formatBytes } from '../../../src/utils/formatters';

export interface SystemInfo {
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

const useSystemInfo = (interval: number = 2000) => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({ os: '', cpu: '' });
  const [metrics, setMetrics] = useState<Metrics>({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    mem: [],
  });
  const [isFetching, setIsFetching] = useState(true); // New state to control fetching

  const fetchDiskAndNetwork = useCallback(async () => {
    try {
      const diskResponse = await window.electronAPI.getDiskUsage();
      const networkResponse = await window.electronAPI.getNetworkActivity();

      if (diskResponse.error) {
        console.error('Error fetching disk usage:', diskResponse.error);
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

      if (networkResponse.error) {
        console.error(
          'Error fetching network activity:',
          networkResponse.error
        );
      } else {
        setMetrics((prev) => ({
          ...prev,
          netRx: networkResponse.netRx,
          netTx: networkResponse.netTx,
        }));
      }
    } catch (error) {
      console.error('Error fetching disk/network data:', error);
    }
  }, []);

  // Initial fetch for disk and network
  useEffect(() => {
    fetchDiskAndNetwork();
  }, [fetchDiskAndNetwork]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startFetching = () => {
      if (isFetching) {
        intervalId = setInterval(fetchDiskAndNetwork, interval);
      }
    };

    const stopFetching = () => {
      clearInterval(intervalId);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsFetching(false);
        stopFetching();
      } else {
        setIsFetching(true);
        startFetching();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (window.electronAPI) {
      const handleSystemInfo = (info: SystemInfo & { error?: string }) => {
        if (info.error) {
          console.error('Error from main process (system info):', info.error);
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

      // Initial fetch
      window.electronAPI.getSystemInfo();

      // Set up listeners
      const removeSystemInfoListener =
        window.electronAPI.onSystemInfoResponse(handleSystemInfo);
      const removeUpdateMetricsListener =
        window.electronAPI.onUpdateMetrics(handleUpdateMetrics);

      // Initial fetch and start polling
      startFetching();

      // Cleanup listeners and interval on unmount
      return () => {
        removeSystemInfoListener();
        removeUpdateMetricsListener();
        stopFetching();
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }
  }, [interval, isFetching, fetchDiskAndNetwork]); // Depend on interval, isFetching, and fetchDiskAndNetwork

  return {
    systemInfo,
    metrics,
    isLoading,
    historicalData,
  };
};

export default useSystemInfo;
