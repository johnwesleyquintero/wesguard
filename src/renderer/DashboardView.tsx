import React, { useState, useEffect } from "react";
import UsageCard from "./UsageCard";

const DashboardView: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState({ os: "", cpu: "" });
  const [metrics, setMetrics] = useState({ cpu: 0, mem: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (window.electronAPI) {
      const handleSystemInfo = (info: { os: string; cpu: string }) => {
        setSystemInfo(info);
        setIsLoading(false);
      };

      const handleUpdateMetrics = (newMetrics: {
        cpu: number;
        mem: number;
      }) => {
        setMetrics(newMetrics);
      };

      window.electronAPI.getSystemInfo();
      const removeSystemInfoListener =
        window.electronAPI.onSystemInfoResponse(handleSystemInfo);
      const removeUpdateMetricsListener =
        window.electronAPI.onUpdateMetrics(handleUpdateMetrics);

      return () => {
        removeSystemInfoListener();
        removeUpdateMetricsListener();
      };
    }
  }, []);

  return (
    <div className="dashboard-view">
      <h2>Dashboard</h2>
      <div className="usage-cards">
        <UsageCard
          title="Operating System"
          model={systemInfo.os}
          usagePercentage={null}
          isLoading={isLoading}
        />
        <UsageCard
          title="CPU"
          model={systemInfo.cpu}
          usagePercentage={metrics.cpu}
          isLoading={isLoading}
        />
        <UsageCard
          title="Memory"
          model=""
          usagePercentage={metrics.mem}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardView;
