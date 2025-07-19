import React, { useEffect, useState } from "react";
import { useRegistryCleaner } from "./hooks/useRegistryCleaner";
import { Trash2, Shield, RotateCcw, Check, AlertTriangle } from "lucide-react";
import "./RegistryCleanerView.css";
import type { RegistryBackup } from "./types";

export const RegistryCleanerView: React.FC = () => {
  const {
    scanning,
    issues,
    backups,
    scanRegistry,
    cleanRegistry,
    restoreBackup,
  } = useRegistryCleaner();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [cleaning, setCleaning] = useState(false);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    scanRegistry();
  }, [scanRegistry]);

  const handleClean = async () => {
    if (selectedItems.size === 0) return;

    setCleaning(true);
    try {
      const itemsToClean = issues.filter((item) =>
        selectedItems.has(item.path),
      );
      await cleanRegistry(itemsToClean);
      setSelectedItems(new Set());
    } finally {
      setCleaning(false);
    }
  };

  const handleRestore = async (backup: RegistryBackup) => {
    setRestoring(true);
    try {
      await restoreBackup(backup);
      await scanRegistry(); // Refresh the issues list
    } finally {
      setRestoring(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === issues.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(issues.map((item) => item.path)));
    }
  };

  const toggleItem = (path: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(path)) {
      newSelected.delete(path);
    } else {
      newSelected.add(path);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="registry-cleaner">
      <div className="registry-cleaner-header">
        <h2>Registry Cleaner</h2>
        <div className="header-actions">
          <button
            className="scan-button"
            onClick={() => scanRegistry()}
            disabled={scanning}
          >
            {scanning ? "Scanning..." : "Scan Registry"}
          </button>
          {issues.length > 0 && (
            <button
              className="clean-button"
              onClick={handleClean}
              disabled={cleaning || selectedItems.size === 0}
            >
              <Trash2 size={16} />
              {cleaning ? "Cleaning..." : "Clean Selected"}
            </button>
          )}
        </div>
      </div>

      {issues.length > 0 && (
        <div className="registry-issues">
          <div className="issues-header">
            <label>
              <input
                type="checkbox"
                checked={selectedItems.size === issues.length}
                onChange={toggleSelectAll}
              />
              Select All
            </label>
            <span>{selectedItems.size} items selected</span>
          </div>
          <div className="issues-list">
            {issues.map((item) => (
              <div key={item.path} className="issue-item">
                <label className="issue-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.path)}
                    onChange={() => toggleItem(item.path)}
                  />
                </label>
                <div className="issue-details">
                  <div className="issue-path">{item.path}</div>
                  <div className="issue-value">{item.value}</div>
                  <div className="issue-type">{item.type}</div>
                </div>
                <div className="issue-status">
                  <AlertTriangle size={16} className="warning-icon" />
                  Invalid Entry
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {backups.length > 0 && (
        <div className="registry-backups">
          <h3>Backup History</h3>
          <div className="backups-list">
            {backups.map((backup) => (
              <div key={backup.timestamp} className="backup-item">
                <div className="backup-info">
                  <Shield size={16} />
                  <span>
                    Backup from {new Date(backup.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  className="restore-button"
                  onClick={() => handleRestore(backup)}
                  disabled={restoring}
                >
                  <RotateCcw size={16} />
                  {restoring ? "Restoring..." : "Restore"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!scanning && issues.length === 0 && (
        <div className="no-issues">
          <Check size={24} className="success-icon" />
          <p>No registry issues found</p>
        </div>
      )}
    </div>
  );
};
