import React, { useState } from "react";

type Status = "idle" | "analyzing" | "analyzed" | "cleaning" | "cleaned";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const CleanerView: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [recoverableSpace, setRecoverableSpace] = useState(0);

  const handleAnalyze = async () => {
    setStatus("analyzing");
    try {
      const size = await window.electronAPI.analyzeJunkFiles();
      setRecoverableSpace(size);
      setStatus("analyzed");
    } catch (error) {
      console.error("Analysis failed:", error);
      setStatus("idle"); // Reset on error
    }
  };

  const handleClean = async () => {
    setStatus("cleaning");
    try {
      const result = await window.electronAPI.executeCleaning();
      if (result.success) {
        setStatus("cleaned");
      } else {
        // Handle cleaning failure, maybe show a notification
        setStatus("analyzed"); // Go back to analyzed state
      }
    } catch (error) {
      console.error("Cleaning failed:", error);
      setStatus("analyzed"); // Go back to analyzed state on error
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setRecoverableSpace(0);
  };

  const renderContent = () => {
    switch (status) {
      case "idle":
        return (
          <>
            <h2>Junk File Cleaner</h2>
            <p>
              Analyze your system to find temporary files and other junk that
              can be safely removed.
            </p>
            <button onClick={handleAnalyze}>Analyze</button>
          </>
        );
      case "analyzing":
        return (
          <>
            <h2>Analyzing...</h2>
            <p>Scanning for junk files. This might take a moment.</p>
            <button disabled>Analyzing...</button>
          </>
        );
      case "analyzed":
        return (
          <>
            <h2>Analysis Complete</h2>
            <p>
              Found{" "}
              <span className="highlight">{formatBytes(recoverableSpace)}</span>{" "}
              of junk files.
            </p>
            <div className="button-group">
              <button onClick={handleClean}>Clean Now</button>
              <button onClick={handleAnalyze}>Re-analyze</button>
            </div>
          </>
        );
      case "cleaning":
        return (
          <>
            <h2>Cleaning...</h2>
            <p>Removing junk files. Please wait.</p>
            <button disabled>Cleaning in progress...</button>
          </>
        );
      case "cleaned":
        return (
          <>
            <h2>Success!</h2>
            <p>
              Successfully freed{" "}
              <span className="highlight">{formatBytes(recoverableSpace)}</span>
              !
            </p>
            <button onClick={handleReset}>Finish</button>
          </>
        );
      default:
        return null;
    }
  };

  return <div className="cleaner-view">{renderContent()}</div>;
};

export default CleanerView;
