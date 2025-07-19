import React, { useState } from "react";
import "./CleanerView.css";
import useJunkFileCleaner from "./hooks/useJunkFileCleaner";

const CleanerView: React.FC = () => {
  const {
    status,
    recoverableSpace,
    junkFiles,
    analyze,
    clean,
    reset,
    formatBytes,
    progress,
    error,
  } = useJunkFileCleaner();

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleFileSelect = (filePath: string) => {
    setSelectedFiles((prevSelected) =>
      prevSelected.includes(filePath)
        ? prevSelected.filter((p) => p !== filePath)
        : [...prevSelected, filePath],
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === junkFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(junkFiles.map((file) => file.path));
    }
  };

  const handleCleanClick = () => {
    if (selectedFiles.length > 0) {
      setShowConfirmDialog(true);
    } else {
      // Optionally, show a message that no files are selected
      alert("Please select files to clean.");
    }
  };

  const confirmClean = () => {
    clean(selectedFiles);
    setShowConfirmDialog(false);
    setSelectedFiles([]); // Clear selection after cleaning
  };

  const cancelClean = () => {
    setShowConfirmDialog(false);
  };

  const renderContent = () => {
    switch (status) {
      case "idle":
        return (
          <>
            <h2>Junk File Cleaner</h2>
            <div className="cleaner-card">
              <p>
                Analyze your system to find temporary files and other junk that
                can be safely removed.
              </p>
              <button onClick={analyze} disabled={status !== "idle"}>
                Analyze
              </button>
            </div>
          </>
        );
      case "analyzing":
        return (
          <>
            <h2>Analyzing...</h2>
            <div className="cleaner-card">
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>{progress || "Scanning for junk files..."}</p>
              </div>
            </div>
          </>
        );
      case "analyzed":
        return (
          <>
            <h2 className="analysis-complete-title">Analysis Complete!</h2>
            <div className="cleaner-card analyzed-state-card">
              {error && <p className="error-message">Error: {error}</p>}
              {junkFiles.length > 0 ? (
                <>
                  <p className="analysis-summary">
                    Found{" "}
                    <span className="highlight">
                      {formatBytes(recoverableSpace)}
                    </span>{" "}
                    of recoverable space across{" "}
                    <span className="highlight">{junkFiles.length}</span> files.
                  </p>
                  <div className="junk-files-list">
                    <div className="list-header-container">
                      <h3>Files to clean:</h3>
                      <label className="select-all-checkbox">
                        <input
                          type="checkbox"
                          checked={
                            selectedFiles.length === junkFiles.length &&
                            junkFiles.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                        Select All
                      </label>
                    </div>
                    <div className="file-list-grid header">
                      <span>Name</span>
                      <span>Path</span>
                      <span>Last Modified</span>
                      <span>Size</span>
                    </div>
                    <ul className="file-list-items">
                      {junkFiles.map((file) => (
                        <li
                          key={`${file.path}-${file.lastModified}`}
                          className="file-list-item"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.path)}
                            onChange={() => handleFileSelect(file.path)}
                          />
                          <span className="file-name">{file.name}</span>
                          <span className="file-path">{file.path}</span>
                          <span className="file-last-modified">
                            {new Date(file.lastModified).toLocaleString()}
                          </span>
                          <span className="file-size">
                            {formatBytes(file.size)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={handleCleanClick}
                      disabled={selectedFiles.length === 0}
                      className="clean-selected-button"
                    >
                      Clean Selected (
                      {formatBytes(
                        junkFiles
                          .filter((f) => selectedFiles.includes(f.path))
                          .reduce((acc, f) => acc + f.size, 0),
                      )}
                      )
                    </button>
                    <button onClick={reset} className="analyze-again-button">
                      Analyze Again
                    </button>
                  </div>
                </>
              ) : (
                <p className="no-files-found">
                  No junk files found. Your system is clean!
                </p>
              )}
            </div>
          </>
        );
      case "cleaning":
        return (
          <>
            <h2>Cleaning...</h2>
            <div className="cleaner-card">
              <div className="loading-indicator">
                <div className="spinner"></div>
                <p>{progress || "Removing junk files..."}</p>
              </div>
            </div>
          </>
        );
      case "cleaned":
        return (
          <>
            <h2>Cleaning Complete!</h2>
            <div className="cleaner-card">
              <p>
                Successfully recovered {formatBytes(recoverableSpace)} of space.
              </p>
              <button onClick={reset}>Clean Again</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="cleaner-container">
      {renderContent()}

      {showConfirmDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <h3>Confirm Cleaning</h3>
            <p>Are you sure you want to delete the selected files?</p>
            <div className="dialog-actions">
              <button onClick={confirmClean} className="confirm-button">
                Yes, Clean
              </button>
              <button onClick={cancelClean} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanerView;
