import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useJunkFileCleaner from './hooks/useJunkFileCleaner';
import { Card } from './components/Card';
import { Button } from './components/Button';
import AnalysisIdle from './components/cleaner/AnalysisIdle';
import AnalysisResults from './components/cleaner/AnalysisResults';
import CleaningInProgress from './components/cleaner/CleaningInProgress';
import CleaningComplete from './components/cleaner/CleaningComplete';
import {
  CLEANER_CONFIRM_DIALOG_TITLE,
  CLEANER_CONFIRM_DIALOG_MESSAGE,
  CLEANER_CONFIRM_BUTTON,
  CLEANER_CANCEL_BUTTON,
  CLEANER_TOAST_NO_FILES_SELECTED,
  CLEANER_ANALYZING_MESSAGE,
} from './constants';

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
        : [...prevSelected, filePath]
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

  return (
    <div className="cleaner-container">
      {status === 'idle' && (
        <AnalysisIdle onAnalyze={analyze} isDisabled={status !== 'idle'} />
      )}

      {status === 'analyzing' && (
        <CleaningInProgress progress={progress || CLEANER_ANALYZING_MESSAGE} />
      )}

      {status === 'analyzed' && (
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

      {status === 'cleaning' && (
        <CleaningInProgress progress={progress || CLEANER_ANALYZING_MESSAGE} />
      )}

      {status === 'cleaned' && (
        <CleaningComplete
          recoverableSpace={recoverableSpace}
          formatBytes={formatBytes}
          onCleanAgain={reset}
        />
      )}

      {showConfirmDialog && (
        <div
          className="confirm-dialog-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <Card className="confirm-dialog">
            <h3 id="confirm-dialog-title">{CLEANER_CONFIRM_DIALOG_TITLE}</h3>
            <p id="confirm-dialog-description">
              {CLEANER_CONFIRM_DIALOG_MESSAGE}
            </p>
            <div className="dialog-actions">
              <Button onClick={confirmClean} variant="danger">
                {CLEANER_CONFIRM_BUTTON}
              </Button>
              <Button onClick={cancelClean} variant="secondary">
                {CLEANER_CANCEL_BUTTON}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CleanerView;
