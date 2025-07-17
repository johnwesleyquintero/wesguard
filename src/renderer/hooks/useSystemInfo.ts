import { useState, useEffect } from "react";

interface SystemInfo {
  os: string;
  cpu: string;
}

interface Metrics {
  cpu: number;
  mem: number;
}

const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({ os: "", cpu: "" });
  const [metrics, setMetrics] = useState<Metrics>({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.electronAPI) {
      const handleSystemInfo = (info: SystemInfo) => {
        setSystemInfo(info);
        setIsLoading(false);
      };

      const handleUpdateMetrics = (newMetrics: Metrics) => {
        setMetrics(newMetrics);
      };

      // Initial fetch
      window.electronAPI.getSystemInfo();

      // Set up listeners
      const removeSystemInfoListener =
        window.electronAPI.onSystemInfoResponse(handleSystemInfo);
      const removeUpdateMetricsListener =
        window.electronAPI.onUpdateMetrics(handleUpdateMetrics);

      // Cleanup listeners on unmount
      return () => {
        removeSystemInfoListener();
        removeUpdateMetricsListener();
      };
    }
  }, []);

  return { systemInfo, metrics, isLoading };
};

export default useSystemInfo;
