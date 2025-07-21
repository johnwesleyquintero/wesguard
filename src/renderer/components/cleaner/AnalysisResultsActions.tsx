import React from 'react';
import { Button } from '../Button';
import { JunkFile } from '../../types';
import { CLEANER_ANALYZE_AGAIN_BUTTON } from '../../constants';

interface AnalysisResultsActionsProps {
  selectedFiles: string[];
  junkFiles: JunkFile[];
  formatBytes: (bytes: number) => string;
  onCleanClick: () => void;
  onAnalyzeAgain: () => void;
}

const AnalysisResultsActions: React.FC<AnalysisResultsActionsProps> = ({
  selectedFiles,
  junkFiles,
  formatBytes,
  onCleanClick,
  onAnalyzeAgain,
}) => {
  const selectedSize = junkFiles
    .filter((f) => selectedFiles.includes(f.path))
    .reduce((acc, f) => acc + f.size, 0);

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-5">
      <Button
        onClick={onCleanClick}
        disabled={selectedFiles.length === 0}
        variant="primary"
        aria-label={`Clean selected files, total size ${formatBytes(
          selectedSize
        )}`}
      >
        Clean Selected ({formatBytes(selectedSize)})
      </Button>
      <Button onClick={onAnalyzeAgain} variant="secondary">
        {CLEANER_ANALYZE_AGAIN_BUTTON}
      </Button>
    </div>
  );
};

export default AnalysisResultsActions;
