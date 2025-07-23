import { useState, useEffect } from "react";

interface SystemInfo {
  os: string;
  cpu: string;
  totalMemory: string;
  disk: string;
}

interface Metrics {
  cpu: number;
  mem: number;
  usedMemory: number;
  netRx: number;
  netTx: number;
  diskUsage: number;
}

interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

interface HistoricalData {
  cpu: HistoricalDataPoint[];
  mem: HistoricalDataPoint[];
}

interface UseSystemInfoResult {
  systemInfo: SystemInfo | null;
  metrics: Metrics;
  historicalData: HistoricalData;
  isLoading: boolean;
}

export const useSystemInfo = (): UseSystemInfoResult => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 0,
    mem: 0,
    usedMemory: 0,
    netRx: 0,
    netTx: 0,
    diskUsage: 0,
  });
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    mem: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setIsLoading(true);
      // In a real application, you would fetch data from an API or ipcRenderer
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      setSystemInfo({
        os: "Windows 10",
        cpu: "Intel Core i7",
        totalMemory: "16 GB",
        disk: "500 GB SSD",
      });

      setMetrics({
        cpu: 25,
        mem: 40,
        usedMemory: 6442450944, // 6 GB
        netRx: 1024,
        netTx: 512,
        diskUsage: 75,
      });

      setHistoricalData({
        cpu: Array.from({ length: 20 }, (_, i) => ({
          timestamp: Date.now() - (20 - i) * 1000,
          value: Math.random() * 100,
        })),
        mem: Array.from({ length: 20 }, (_, i) => ({
          timestamp: Date.now() - (20 - i) * 1000,
          value: Math.random() * 100,
        })),
      });

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { systemInfo, metrics, historicalData, isLoading };
};
