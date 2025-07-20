import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import PageHeader from './components/PageHeader';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<MemoryUsageData[]>([]);

  const fetchCurrentUsage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await window.electronAPI.memoryOptimizer.getCurrentUsage();
      setCurrentUsage(result);
    } catch (err) {
      console.error('Failed to fetch current memory usage:', err);
      setError('Failed to load current memory usage. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const optimizeMemory = useCallback(async () => {
    setLoading(true);
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
    } catch (err) {
      console.error('Failed to optimize memory:', err);
      setError('Failed to optimize memory. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fetchCurrentUsage]);

  const fetchMemoryHistory = useCallback(async () => {
    try {
      const result = await window.electronAPI.memoryOptimizer.getHistory();
      setHistory(result);
    } catch (err) {
      console.error('Failed to fetch memory history:', err);
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

  return (
    <div className="memory-optimizer-view">
      <PageHeader title="Memory Optimizer" />
      <p>Analyze and optimize your system's RAM usage.</p>

      <Card className="memory-stats">
        {loading && <p>Loading memory data...</p>}
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

      <Button onClick={optimizeMemory} disabled={loading}>
        {loading ? 'Optimizing...' : 'Optimize Memory'}
      </Button>

      {optimizationSuggestions.length > 0 && (
        <Card className="optimization-suggestions">
          <h3>Optimization Suggestions:</h3>
          <ul>
            {optimizationSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </Card>
      )}

      {history.length > 0 && (
        <Card className="memory-history">
          <h3>Memory Usage History (Last 10 entries):</h3>
          <ul>
            {history.slice(-10).map((entry, index) => (
              <li key={index}>
                {new Date(entry.timestamp).toLocaleTimeString()}:{' '}
                {entry.usedPercentage.toFixed(2)}% used
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default MemoryOptimizerView;
