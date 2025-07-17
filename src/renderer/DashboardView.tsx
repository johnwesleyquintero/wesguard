import React from "react";
import UsageCard from "./UsageCard";
import useSystemInfo from "./hooks/useSystemInfo";

const DashboardView: React.FC = () => {
  const { systemInfo, metrics, isLoading } = useSystemInfo();

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
