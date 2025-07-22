import React, { useState } from "react";
import styles from "./styles/styles.module.css";
import useSystemInfo from "./hooks/useSystemInfo";
import { Card } from "./components/Card";
import PageHeader from "./components/PageHeader";
import ValidatedInput from "./components/ValidatedInput";

const SettingsView: React.FC = () => {
  const [localInterval, setLocalInterval] = useState(2); // Default to 2 seconds, matching useSystemInfo default
  const [intervalError, setIntervalError] = useState<string | null>(null);
  useSystemInfo(localInterval * 1000); // Pass localInterval to useSystemInfo

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value.trim() === "") {
      setIntervalError("Update interval cannot be empty.");
      setLocalInterval(0); // Or some other default/invalid state
    } else if (isNaN(parsedValue) || parsedValue <= 0) {
      setIntervalError("Please enter a positive number.");
      setLocalInterval(parsedValue);
    } else {
      setIntervalError(null);
      setLocalInterval(parsedValue);
    }
  };

  return (
    <div className={styles["settings-view"]}>
      <PageHeader title="Settings" />

      <Card className={styles["settings-section"]}>
        <h3>System Metrics</h3>
        <div className={styles["setting-item"]}>
          <label
            htmlFor="update-interval"
            className="block text-sm font-medium text-gray-700"
          >
            Update Interval (seconds):
          </label>
          <ValidatedInput
            id="update-interval"
            label="Update Interval (seconds):"
            type="number"
            value={localInterval}
            onChange={handleIntervalChange}
            min="1"
            error={intervalError}
          />
        </div>
      </Card>

      {/* Add more settings sections here as needed */}
    </div>
  );
};

export default SettingsView;
