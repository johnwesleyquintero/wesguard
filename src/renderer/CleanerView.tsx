import React from "react";
import useJunkFileCleaner from "./hooks/useJunkFileCleaner";

const CleanerView: React.FC = () => {
  const { status, recoverableSpace, analyze, clean, reset, formatBytes } =
    useJunkFileCleaner();

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
            <button onClick={analyze}>Analyze</button>
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
              <button onClick={clean}>Clean Now</button>
              <button onClick={analyze}>Re-analyze</button>
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
            <button onClick={reset}>Finish</button>
          </>
        );
      default:
        return null;
    }
  };

  return <div className="cleaner-view">{renderContent()}</div>;
};

export default CleanerView;
