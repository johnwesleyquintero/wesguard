import React, { useState } from "react";
import toast from "react-hot-toast";
import useJunkFileCleaner from "./hooks/useJunkFileCleaner";
import ConfirmDialog from "./components/ConfirmDialog";
import AnalysisIdle from "./components/cleaner/AnalysisIdle";
import AnalysisResults from "./components/cleaner/AnalysisResults";
import CleaningInProgress from "./components/cleaner/CleaningInProgress";
import CleaningComplete from "./components/cleaner/CleaningComplete";
import {
  CLEANER_CONFIRM_DIALOG_TITLE,
  CLEANER_CONFIRM_DIALOG_MESSAGE,
  CLEANER_TOAST_NO_FILES_SELECTED,
  CLEANER_ANALYZING_MESSAGE,
} from "./constants";
import EmptyState from "./components/EmptyState";
import { Button } from "./components/Button";

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
      toast.error(CLEANER_TOAST_NO_FILES_SELECTED);
    }
  };

  const confirmClean = () => {
    clean(selectedFiles);
    setShowConfirmDialog(false);
    setSelectedFiles([]);
  };

  const cancelClean = () => {
    setShowConfirmDialog(false);
  };

  const NoJunkFilesIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  return (
    <div className="cleaner-container">
      {status === "idle" && (
        <AnalysisIdle onAnalyze={analyze} isDisabled={status !== "idle"} />
      )}

      {status === "analyzing" && (
        <CleaningInProgress progress={progress || CLEANER_ANALYZING_MESSAGE} />
      )}

      {status === "analyzed" && junkFiles.length > 0 && (
        <AnalysisResults
          error={error}
          junkFiles={junkFiles}
          recoverableSpace={recoverableSpace}
          selectedFiles={selectedFiles}
          formatBytes={formatBytes}
          onFileSelect={handleFileSelect}
          onSelectAll={handleSelectAll}
          onCleanClick={handleCleanClick}
          onAnalyzeAgain={reset}
        />
      )}

      {status === "analyzed" && junkFiles.length === 0 && (
        <EmptyState
          icon={<NoJunkFilesIcon />}
          message="No junk files found on your system. Your system is clean!"
          callToAction={<Button onClick={reset}>Scan Again</Button>}
        />
      )}

      {status === "cleaning" && (
        <CleaningInProgress progress={progress || CLEANER_ANALYZING_MESSAGE} />
      )}

      {status === "cleaned" && (
        <CleaningComplete
          recoverableSpace={recoverableSpace}
          formatBytes={formatBytes}
          onCleanAgain={reset}
        />
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title={CLEANER_CONFIRM_DIALOG_TITLE}
        message={CLEANER_CONFIRM_DIALOG_MESSAGE}
        onConfirm={confirmClean}
        onCancel={cancelClean}
      />
    </div>
  );
};

export default CleanerView;
