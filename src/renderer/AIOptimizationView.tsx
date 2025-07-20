import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/Button';
import PageHeader from './components/PageHeader';
import { SuggestionCard } from './components/AIOptimization/SuggestionCard';

const AIOptimizationView: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await window.electronAPI.aiOptimization.getSuggestions();
      setSuggestions(result);
    } catch (err) {
      console.error('Failed to fetch AI suggestions:', err);
      setError('Failed to load suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const initAIDataDir = useCallback(async () => {
    try {
      await window.electronAPI.aiOptimization.initDataDir();
    } catch (err) {
      console.error('Failed to initialize AI data directory:', err);
    }
  }, []);

  useEffect(() => {
    initAIDataDir();
    fetchSuggestions();
  }, [fetchSuggestions, initAIDataDir]);

  return (
    <div className="ai-optimization-view">
      <PageHeader title="AI-Powered Optimization" />
      <p>Get predictive maintenance suggestions based on system analysis.</p>

      <Button onClick={fetchSuggestions} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze System for Suggestions'}
      </Button>

      {error && <p className="error-message">{error}</p>}

      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard key={index} suggestion={suggestion} />
        ))}
      </div>

      {suggestions.length === 0 && !loading && !error && (
        <p>
          No immediate suggestions at this time. Your system appears healthy!
        </p>
      )}
    </div>
  );
};

export default AIOptimizationView;
