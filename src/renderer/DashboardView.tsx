import React, { useMemo } from "react";
import UsageCard from "./UsageCard";
import { useSystemInfo } from "./hooks/useSystemInfo";
import { useSystemInfoContext } from "./context/SystemInfoContext";
import { Line } from "react-chartjs-2";
import { formatBytes } from "../../src/utils/formatters";
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
  DASHBOARD_LOADING,
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
  const { systemInfo, isLoading } = useSystemInfoContext();
  const { metrics, historicalData } = useSystemInfo();

  const cpuChartData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels: historicalData.cpu.map((data: any) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: CPU_CHART_LABEL,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: historicalData.cpu.map((data: any) => data.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const memChartData = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    labels: historicalData.mem.map((data: any) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: MEMORY_CHART_LABEL,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: historicalData.mem.map((data: any) => data.value),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = useMemo(
    () => ({
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
    }),
    [],
  );

  if (isLoading) {
    return (
      <div className="dashboard-view">
        <LoadingIndicator message={DASHBOARD_LOADING} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 sm:p-6 lg:p-8">
      <PageHeader title={DASHBOARD_TITLE} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
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
          model={`${
            metrics.usedMemory !== undefined
              ? formatBytes(metrics.usedMemory)
              : "N/A"
          } / ${systemInfo?.totalMemory || "N/A"}`}
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
          model={`Rx: ${metrics.netRx !== undefined ? formatBytes(metrics.netRx) : "N/A"}/s | Tx: ${
            metrics.netTx !== undefined ? formatBytes(metrics.netTx) : "N/A"
          }/s`}
          usagePercentage={null}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="chart-container p-4">
          <h3 className="text-lg font-semibold mb-4">
            {HISTORICAL_CPU_USAGE_TITLE}
          </h3>
          <div className="h-64">
            <MemoizedCpuChart data={cpuChartData} options={chartOptions} />
          </div>
        </Card>

        <Card className="chart-container p-4">
          <h3 className="text-lg font-semibold mb-4">
            {HISTORICAL_MEMORY_USAGE_TITLE}
          </h3>
          <div className="h-64">
            <MemoizedMemChart data={memChartData} options={chartOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
