import React, { useState, useEffect, useCallback } from "react";
import type { ElectronAPI } from "./types";
import { Button } from "./components/Button";
import { Card } from "./components/Card";

const AIOptimizationView: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await (
        window.electronAPI as ElectronAPI
      ).aiGetSuggestions();
      setSuggestions(result);
    } catch (err) {
      console.error("Failed to fetch AI suggestions:", err);
      setError("Failed to load suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const initAIDataDir = useCallback(async () => {
    try {
      await (window.electronAPI as ElectronAPI).aiInitDataDir();
    } catch (err) {
      console.error("Failed to initialize AI data directory:", err);
    }
  }, []);

  useEffect(() => {
    initAIDataDir();
    fetchSuggestions();
  }, [fetchSuggestions, initAIDataDir]);

  return (
    <div className="ai-optimization-view">
      <h2>AI-Powered Optimization</h2>
      <p>Get predictive maintenance suggestions based on system analysis.</p>

      <Button onClick={fetchSuggestions} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze System for Suggestions"}
      </Button>

      {error && <p className="error-message">{error}</p>}

      {suggestions.length > 0 && (
        <Card className="suggestions-list">
          <h3>Suggestions:</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </Card>
      )}

      {suggestions.length === 0 && !loading && !error && (
        <p>
          No immediate suggestions at this time. Your system appears healthy!
        </p>
      )}
    </div>
  );
};

export default AIOptimizationView;
