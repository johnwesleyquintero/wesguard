import React, { useState, useEffect } from "react";
import useSystemInfo from "./hooks/useSystemInfo";
import "./SettingsView.css"; // Assuming you'll create this CSS file

const SettingsView: React.FC = () => {
  const { updateInterval, setMetricsUpdateInterval } = useSystemInfo();
  const [localInterval, setLocalInterval] = useState(updateInterval / 1000); // Convert ms to seconds

  useEffect(() => {
    setLocalInterval(updateInterval / 1000);
  }, [updateInterval]);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLocalInterval(value);
    }
  };

  const handleSaveSettings = () => {
    setMetricsUpdateInterval(localInterval * 1000); // Convert seconds back to ms
    alert("Settings saved!");
  };

  return (
    <div className="settings-view">
      <h2>Settings</h2>

      <section className="settings-section">
        <h3>System Metrics</h3>
        <div className="setting-item">
          <label htmlFor="update-interval">Update Interval (seconds):</label>
          <input
            id="update-interval"
            type="number"
            value={localInterval}
            onChange={handleIntervalChange}
            min="1"
          />
          <button onClick={handleSaveSettings}>Save</button>
        </div>
      </section>

      {/* Add more settings sections here as needed */}
    </div>
  );
};

export default SettingsView;
