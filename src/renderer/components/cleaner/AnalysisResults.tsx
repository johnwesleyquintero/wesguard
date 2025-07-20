import React from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import PageHeader from '../PageHeader';
import { JunkFile } from '../../types';
import {
  CLEANER_ANALYSIS_COMPLETE_TITLE,
  CLEANER_FILES_TO_CLEAN_HEADER,
  CLEANER_SELECT_ALL,
  CLEANER_NO_FILES_FOUND,
  CLEANER_ANALYZE_AGAIN_BUTTON,
} from '../../constants';
import styles from './AnalysisResults.module.css';

interface AnalysisResultsProps {
  error: string | null;
  junkFiles: JunkFile[];
  recoverableSpace: number;
  selectedFiles: string[];
  formatBytes: (bytes: number) => string;
  onFileSelect: (filePath: string) => void;
  onSelectAll: () => void;
  onCleanClick: () => void;
  onAnalyzeAgain: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  error,
  junkFiles,
  recoverableSpace,
  selectedFiles,
  formatBytes,
  onFileSelect,
  onSelectAll,
  onCleanClick,
  onAnalyzeAgain,
}) => {
  return (
    <>
      <PageHeader title={CLEANER_ANALYSIS_COMPLETE_TITLE} />
      <Card className={styles.analyzedStateCard}>
        {error && <p className={styles.errorMessage}>Error: {error}</p>}
        {junkFiles.length > 0 ? (
          <>
            <p className={styles.analysisSummary}>
              Found{' '}
              <span className={styles.highlight}>
                {formatBytes(recoverableSpace)}
              </span>{' '}
              of recoverable space across{' '}
              <span className={styles.highlight}>{junkFiles.length}</span>{' '}
              files.
            </p>
            <div className={styles.junkFilesList}>
              <div className={styles.listHeaderContainer}>
                <h3>{CLEANER_FILES_TO_CLEAN_HEADER}</h3>
                <label className={styles.selectAllCheckbox}>
                  <input
                    type="checkbox"
                    checked={
                      selectedFiles.length === junkFiles.length &&
                      junkFiles.length > 0
                    }
                    onChange={onSelectAll}
                  />
                  {CLEANER_SELECT_ALL}
                </label>
              </div>
              <div className={`${styles.fileListGrid} ${styles.header}`}>
                <span>Name</span>
                <span>Path</span>
                <span>Last Modified</span>
                <span>Size</span>
              </div>
              <ul className={styles.fileListItems}>
                {junkFiles.map((file) => (
                  <li
                    key={`${file.path}-${file.lastModified}`}
                    className={styles.fileListItem}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.path)}
                      onChange={() => onFileSelect(file.path)}
                    />
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.filePath}>{file.path}</span>
                    <span className={styles.fileLastModified}>
                      {new Date(file.lastModified).toLocaleString()}
                    </span>
                    <span className={styles.fileSize}>
                      {formatBytes(file.size)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.actionButtons}>
              <Button
                onClick={onCleanClick}
                disabled={selectedFiles.length === 0}
                variant="primary"
              >
                Clean Selected (
                {formatBytes(
                  junkFiles
                    .filter((f) => selectedFiles.includes(f.path))
                    .reduce((acc, f) => acc + f.size, 0)
                )}
                )
              </Button>
              <Button onClick={onAnalyzeAgain} variant="secondary">
                {CLEANER_ANALYZE_AGAIN_BUTTON}
              </Button>
            </div>
          </>
        ) : (
          <p className={styles.noFilesFound}>{CLEANER_NO_FILES_FOUND}</p>
        )}
      </Card>
    </>
  );
};

export default AnalysisResults;
