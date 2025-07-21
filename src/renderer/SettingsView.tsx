import React, { useState } from 'react';
import styles from './components/styles.module.css';
import useSystemInfo from './hooks/useSystemInfo';
import { Card } from './components/Card';
import PageHeader from './components/PageHeader';

const SettingsView: React.FC = () => {
  const [localInterval, setLocalInterval] = useState(2); // Default to 2 seconds, matching useSystemInfo default
  useSystemInfo(localInterval * 1000); // Pass localInterval to useSystemInfo

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLocalInterval(value);
    }
  };

  return (
    <div className={styles['settings-view']}>
      <PageHeader title="Settings" />

      <Card className={styles['settings-section']}>
        <h3>System Metrics</h3>
        <div className={styles['setting-item']}>
          <label
            htmlFor="update-interval"
            className="block text-sm font-medium text-gray-700"
          >
            Update Interval (seconds):
          </label>
          <input
            id="update-interval"
            type="number"
            value={localInterval}
            onChange={handleIntervalChange}
            min="1"
            className="form-input mt-1"
          />
          {/* Example of validation feedback */}
          {/* {intervalError && <p className="mt-2 text-sm text-red-600">{intervalError}</p>} */}
        </div>
      </Card>

      {/* Add more settings sections here as needed */}
    </div>
  );
};

export default SettingsView;
