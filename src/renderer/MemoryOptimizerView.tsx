import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import PageHeader from './components/PageHeader';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MemoryUsageData {
  timestamp: string;
  total: number;
  used: number;
  free: number;
  usedPercentage: number;
}

const MemoryOptimizerView: React.FC = () => {
  const [currentUsage, setCurrentUsage] = useState<MemoryUsageData | null>(
    null
  );
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<
    string[]
  >([]);
  const [isFetchingUsage, setIsFetchingUsage] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<MemoryUsageData[]>([]);

  const fetchCurrentUsage = useCallback(async () => {
    setIsFetchingUsage(true);
    setError(null);
    try {
      const result = await window.electronAPI.memoryOptimizer.getCurrentUsage();
      setCurrentUsage(result);
    } catch (err: unknown) {
      console.error('Failed to fetch current memory usage:', err);
      setError(
        `Failed to load current memory usage: ${(err as Error).message || 'Unknown error'}. Please try again.`
      );
    } finally {
      setIsFetchingUsage(false);
    }
  }, []);

  const optimizeMemory = useCallback(async () => {
    setIsOptimizing(true);
    setError(null);
    try {
      const result = await window.electronAPI.memoryOptimizer.optimizeMemory();
      if (result.success) {
        setOptimizationSuggestions(result.suggestions || []);
        // Re-fetch current usage after optimization attempt
        await fetchCurrentUsage();
      } else {
        setError(result.error || 'Failed to optimize memory.');
      }
    } catch (err: unknown) {
      console.error('Failed to optimize memory:', err);
      setError(
        `Failed to optimize memory: ${(err as Error).message || 'Unknown error'}. Please try again.`
      );
    } finally {
      setIsOptimizing(false);
    }
  }, [fetchCurrentUsage]);

  const fetchMemoryHistory = useCallback(async () => {
    setIsFetchingHistory(true);
    try {
      const result = await window.electronAPI.memoryOptimizer.getHistory();
      setHistory(result);
    } catch (err: unknown) {
      console.error('Failed to fetch memory history:', err);
      setError(
        `Failed to fetch memory history: ${(err as Error).message || 'Unknown error'}.`
      );
    } finally {
      setIsFetchingHistory(false);
    }
  }, []);

  const initMemoryDataDir = useCallback(async () => {
    try {
      await window.electronAPI.memoryOptimizer.initDataDir();
    } catch (err) {
      console.error('Failed to initialize memory data directory:', err);
    }
  }, []);

  useEffect(() => {
    initMemoryDataDir();
    fetchCurrentUsage();
    fetchMemoryHistory();
    // Optionally, set up an interval to log memory usage periodically
    const interval = setInterval(() => {
      if (currentUsage) {
        window.electronAPI.aiOptimization.logPerformance({
          timestamp: new Date().toISOString(),
          cpu: 0,
          mem: currentUsage.usedPercentage,
          diskUsage: 0,
          totalDisk: 0,
          netRx: 0,
          netTx: 0,
        });
      }
    }, 60000); // Log every minute

    return () => clearInterval(interval);
  }, [fetchCurrentUsage, fetchMemoryHistory, initMemoryDataDir, currentUsage]);

  const chartData = {
    labels: history.slice(-10).map((entry) =>
      new Date(entry.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Memory Usage (%)',
        data: history.slice(-10).map((entry) => entry.usedPercentage),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Memory Usage History',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Used Percentage (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return (
    <div className="memory-optimizer-view">
      <PageHeader title="Memory Optimizer" />
      <p>Analyze and optimize your system's RAM usage.</p>

      <Card className="memory-stats">
        {isFetchingUsage && <p>Analyzing current memory usage...</p>}
        {isFetchingHistory && <p>Loading memory history...</p>}
        {error && <p className="error-message">{error}</p>}
        {currentUsage && (
          <>
            <h3>Current Memory Usage:</h3>
            <p>Total RAM: {(currentUsage.total / 1024 ** 3).toFixed(2)} GB</p>
            <p>Used RAM: {(currentUsage.used / 1024 ** 3).toFixed(2)} GB</p>
            <p>Free RAM: {(currentUsage.free / 1024 ** 3).toFixed(2)} GB</p>
            <p>Used Percentage: {currentUsage.usedPercentage.toFixed(2)}%</p>
          </>
        )}
      </Card>

      <Button onClick={optimizeMemory} disabled={isOptimizing}>
        {isOptimizing ? 'Optimizing...' : 'Optimize Memory'}
      </Button>

      {optimizationSuggestions.length > 0 && (
        <Card className="optimization-suggestions">
          <h3>Optimization Suggestions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizationSuggestions.map((suggestion, index) => (
              <Card key={index} className="p-4 flex items-center space-x-3">
                <span className="text-green-500 text-xl">💡</span>{' '}
                {/* Example icon */}
                <p>{suggestion}</p>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {history.length > 0 && (
        <Card className="memory-history">
          <h3>Memory Usage History (Last 10 entries):</h3>
          <div style={{ height: '300px' }}>
            <Line
              data={chartData}
              options={chartOptions}
              aria-label="Memory Usage History Chart"
              role="img"
            />
          </div>
          <div className="sr-only" aria-live="polite">
            <h4>Memory Usage History Data Table</h4>
            <table>
              <caption>Memory Usage History</caption>
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Memory Usage (%)</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(-10).map((entry, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(entry.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td>{entry.usedPercentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MemoryOptimizerView;
