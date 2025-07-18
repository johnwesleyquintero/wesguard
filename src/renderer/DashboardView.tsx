import React from "react";
import UsageCard from "./UsageCard";
import useSystemInfo from "./hooks/useSystemInfo";
import { useGlobalAppContext } from "./context/SystemInfoContext";
import { Line } from "react-chartjs-2";
import { Card } from "./components/Card";
import LoadingIndicator from "./components/LoadingIndicator";
import PageHeader from "./components/PageHeader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import {
  DASHBOARD_LOADING_MESSAGE,
  DASHBOARD_TITLE,
  USAGE_CARD_OS_TITLE,
  USAGE_CARD_CPU_TITLE,
  USAGE_CARD_MEMORY_TITLE,
  USAGE_CARD_DISK_TITLE,
  USAGE_CARD_NETWORK_TITLE,
  HISTORICAL_CPU_USAGE_TITLE,
  HISTORICAL_MEMORY_USAGE_TITLE,
  CPU_CHART_LABEL,
  MEMORY_CHART_LABEL,
  SYSTEM_USAGE_OVER_TIME_TITLE,
} from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const MemoizedCpuChart = React.memo(
  ({
    data,
    options,
  }: {
    data: ChartData<"line">;
    options: ChartOptions<"line">;
  }) => <Line data={data} options={options} />,
);

const MemoizedMemChart = React.memo(
  ({
    data,
    options,
  }: {
    data: ChartData<"line">;
    options: ChartOptions<"line">;
  }) => <Line data={data} options={options} />,
);

const DashboardView: React.FC = () => {
  const { systemInfo, isLoading } = useGlobalAppContext();
  const { metrics, historicalData } = useSystemInfo();

  const cpuChartData = {
    labels: historicalData.cpu.map((data) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: CPU_CHART_LABEL,
        data: historicalData.cpu.map((data) => data.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const memChartData = {
    labels: historicalData.mem.map((data) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: MEMORY_CHART_LABEL,
        data: historicalData.mem.map((data) => data.value),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
      title: {
        display: true,
        text: SYSTEM_USAGE_OVER_TIME_TITLE,
        color: "#e0e0e0",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#e0e0e0",
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          color: "#333",
        },
      },
      y: {
        ticks: {
          color: "#e0e0e0",
          callback: function (value: string | number) {
            return `${value}%`;
          },
        },
        grid: {
          color: "#333",
        },
        min: 0,
        max: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="dashboard-view">
        <LoadingIndicator message={DASHBOARD_LOADING_MESSAGE} />
      </div>
    );
  }

  return (
    <div className="dashboard-view">
      <PageHeader title={DASHBOARD_TITLE} />
      <div className="usage-cards">
        <UsageCard
          title={USAGE_CARD_OS_TITLE}
          model={systemInfo?.os || ""}
          usagePercentage={null}
          isLoading={isLoading}
        />
        <UsageCard
          title={USAGE_CARD_CPU_TITLE}
          model={systemInfo?.cpu || ""}
          usagePercentage={metrics.cpu}
          isLoading={isLoading}
        />
        <UsageCard
          title={USAGE_CARD_MEMORY_TITLE}
          model=""
          usagePercentage={metrics.mem}
          isLoading={isLoading}
        />
        <UsageCard
          title={USAGE_CARD_DISK_TITLE}
          model={systemInfo?.disk || ""}
          usagePercentage={metrics.diskUsage || 0}
          isLoading={isLoading}
        />
        <UsageCard
          title={USAGE_CARD_NETWORK_TITLE}
          model={`Rx: ${metrics.netRx !== undefined ? (metrics.netRx / 1024).toFixed(2) : "N/A"} KB/s | Tx: ${metrics.netTx !== undefined ? (metrics.netTx / 1024).toFixed(2) : "N/A"} KB/s`}
          usagePercentage={null}
          isLoading={isLoading}
        />
      </div>

      <Card className="chart-container">
        <h3>{HISTORICAL_CPU_USAGE_TITLE}</h3>
        <div className="chart-wrapper">
          <MemoizedCpuChart data={cpuChartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="chart-container">
        <h3>{HISTORICAL_MEMORY_USAGE_TITLE}</h3>
        <div className="chart-wrapper">
          <MemoizedMemChart data={memChartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
