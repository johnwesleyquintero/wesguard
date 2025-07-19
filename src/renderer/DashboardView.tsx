import React from "react";
import UsageCard from "./UsageCard";
import useSystemInfo from "./hooks/useSystemInfo";
import { Line } from "react-chartjs-2";
import { Card } from "./components/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardView: React.FC = () => {
  const { systemInfo, metrics, isLoading, historicalData } = useSystemInfo();

  const cpuChartData = {
    labels: historicalData.cpu.map((data) =>
      new Date(data.timestamp).toLocaleTimeString(),
    ),
    datasets: [
      {
        label: "CPU Usage (%)",
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
        label: "Memory Usage (%)",
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
        text: "System Usage Over Time",
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
        <UsageCard
          title="Disk Usage"
          model={systemInfo.disk || ""}
          usagePercentage={metrics.diskUsage || 0}
          isLoading={isLoading}
        />
        <UsageCard
          title="Network (Rx/Tx)"
          model={`Rx: ${metrics.netRx !== undefined ? (metrics.netRx / 1024).toFixed(2) : "N/A"} KB/s | Tx: ${metrics.netTx !== undefined ? (metrics.netTx / 1024).toFixed(2) : "N/A"} KB/s`}
          usagePercentage={null}
          isLoading={isLoading}
        />
      </div>

      <Card className="chart-container">
        <h3>Historical CPU Usage</h3>
        <div className="chart-wrapper">
          <Line data={cpuChartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="chart-container">
        <h3>Historical Memory Usage</h3>
        <div className="chart-wrapper">
          <Line data={memChartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default DashboardView;
