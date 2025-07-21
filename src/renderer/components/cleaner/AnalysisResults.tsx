import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
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

type SortKey = 'name' | 'size' | 'lastModified';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedAndFilteredFiles = useMemo(() => {
    const files = [...junkFiles].filter(
      (file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.path.toLowerCase().includes(searchTerm.toLowerCase())
    );

    files.sort((a, b) => {
      if (sortKey === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === 'size') {
        return sortDirection === 'asc' ? a.size - b.size : b.size - a.size;
      } else if (sortKey === 'lastModified') {
        return sortDirection === 'asc'
          ? new Date(a.lastModified).getTime() -
              new Date(b.lastModified).getTime()
          : new Date(b.lastModified).getTime() -
              new Date(a.lastModified).getTime();
      }
      return 0;
    });
    return files;
  }, [junkFiles, searchTerm, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const file = sortedAndFilteredFiles[index];
    if (!file) return null;

    return (
      <div
        key={`${file.path}-${file.lastModified}`}
        className={`${styles.fileListItem} ${
          selectedFiles.includes(file.path) ? styles.selected : ''
        }`}
        role="row"
        tabIndex={0}
        onClick={() => onFileSelect(file.path)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onFileSelect(file.path);
          }
        }}
        aria-selected={selectedFiles.includes(file.path)}
        style={style}
      >
        <input
          type="checkbox"
          id={`file-checkbox-${file.path}`}
          checked={selectedFiles.includes(file.path)}
          onChange={() => onFileSelect(file.path)}
          aria-labelledby={`file-name-${file.path}`}
          tabIndex={-1}
        />
        <span
          id={`file-name-${file.path}`}
          className={styles.fileName}
          role="gridcell"
        >
          {file.name}
        </span>
        <span className={styles.filePath} role="gridcell">
          {file.path}
        </span>
        <span className={styles.fileLastModified} role="gridcell">
          {new Date(file.lastModified).toLocaleString()}
        </span>
        <span className={styles.fileSize} role="gridcell">
          {formatBytes(file.size)}
        </span>
      </div>
    );
  };

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
                <input
                  type="text"
                  id="search-files"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  className={styles.searchBar}
                  aria-label="Search files"
                />
                <label
                  htmlFor="select-all-checkbox"
                  className={styles.selectAllCheckbox}
                >
                  <input
                    type="checkbox"
                    id="select-all-checkbox"
                    checked={
                      selectedFiles.length === sortedAndFilteredFiles.length &&
                      sortedAndFilteredFiles.length > 0
                    }
                    onChange={onSelectAll}
                    aria-label={CLEANER_SELECT_ALL}
                  />
                  {CLEANER_SELECT_ALL}
                </label>
              </div>
              <div className={styles.fileListContainer} role="grid">
                <div
                  className={`${styles.fileListGrid} ${styles.header}`}
                  role="rowgroup"
                >
                  <div role="row">
                    <div
                      role="columnheader"
                      tabIndex={0}
                      onClick={() => handleSort('name')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSort('name');
                        }
                      }}
                      aria-sort={
                        sortKey === 'name'
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                      className={styles.sortableHeader}
                    >
                      Name{getSortIndicator('name')}
                    </div>
                    <div role="columnheader">Path</div>
                    <div
                      role="columnheader"
                      tabIndex={0}
                      onClick={() => handleSort('lastModified')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSort('lastModified');
                        }
                      }}
                      aria-sort={
                        sortKey === 'lastModified'
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                      className={styles.sortableHeader}
                    >
                      Last Modified{getSortIndicator('lastModified')}
                    </div>
                    <div
                      role="columnheader"
                      tabIndex={0}
                      onClick={() => handleSort('size')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleSort('size');
                        }
                      }}
                      aria-sort={
                        sortKey === 'size'
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                      }
                      className={styles.sortableHeader}
                    >
                      Size{getSortIndicator('size')}
                    </div>
                  </div>
                </div>
                <List
                  height={400} // Adjust height as needed
                  itemCount={sortedAndFilteredFiles.length}
                  itemSize={35} // Adjust item size based on your row height
                  width="100%"
                >
                  {Row}
                </List>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <Button
                onClick={onCleanClick}
                disabled={selectedFiles.length === 0}
                variant="primary"
                aria-label={`Clean selected files, total size ${formatBytes(
                  junkFiles
                    .filter((f) => selectedFiles.includes(f.path))
                    .reduce((acc, f) => acc + f.size, 0)
                )}`}
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
