import React from "react";
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
  } = useJunkFileCleaner();

  const renderContent = () => {
    switch (status) {
      case "idle":
        return (
          <div className="cleaner-content">
            <h2>Junk File Cleaner</h2>
            <p>
              Analyze your system to find temporary files and other junk that
              can be safely removed.
            </p>
            <button onClick={analyze} disabled={status !== "idle"}>
              Analyze
            </button>
          </div>
        );
      case "analyzing":
        return (
          <div className="cleaner-content">
            <h2>Analyzing...</h2>
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Scanning for junk files...</p>
            </div>
          </div>
        );
      case "analyzed":
        return (
          <div className="cleaner-content">
            <h2>Analysis Complete!</h2>
            {junkFiles.length > 0 ? (
              <>
                <p>
                  Found {formatBytes(recoverableSpace)} of recoverable space
                  across {junkFiles.length} files.
                </p>
                <div className="junk-files-list">
                  <h3>Files to clean:</h3>
                  <ul>
                    {junkFiles.map((file, index) => (
                      <li key={index}>
                        <span>{file.name}</span>
                        <span>{formatBytes(file.size)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={clean}>Clean Now</button>
              </>
            ) : (
              <p>No junk files found. Your system is clean!</p>
            )}
            <button onClick={reset}>Analyze Again</button>
          </div>
        );
      case "cleaning":
        return (
          <div className="cleaner-content">
            <h2>Cleaning...</h2>
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Removing junk files...</p>
            </div>
          </div>
        );
      case "cleaned":
        return (
          <div className="cleaner-content">
            <h2>Cleaning Complete!</h2>
            <p>
              Successfully recovered {formatBytes(recoverableSpace)} of space.
            </p>
            <button onClick={reset}>Clean Again</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="cleaner-container">{renderContent()}</div>;
};

export default CleanerView;
