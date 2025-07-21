import React from 'react';
import PageHeader from '../PageHeader';
import { CLEANER_ANALYSIS_COMPLETE_TITLE } from '../../constants';

interface AnalysisResultsHeaderProps {
  error: string | null;
  recoverableSpace: number;
  junkFilesCount: number;
  formatBytes: (bytes: number) => string;
}

const AnalysisResultsHeader: React.FC<AnalysisResultsHeaderProps> = ({
  error,
  recoverableSpace,
  junkFilesCount,
  formatBytes,
}) => {
  return (
    <>
      <PageHeader title={CLEANER_ANALYSIS_COMPLETE_TITLE} />
      {error && <p className="text-center text-red-500 mb-4">Error: {error}</p>}
      {junkFilesCount > 0 && (
        <p className="text-center text-lg">
          Found{' '}
          <span className="text-accent-500 font-bold">
            {formatBytes(recoverableSpace)}
          </span>{' '}
          of recoverable space across{' '}
          <span className="text-accent-500 font-bold">{junkFilesCount}</span>{' '}
          files.
        </p>
      )}
    </>
  );
};

export default AnalysisResultsHeader;
