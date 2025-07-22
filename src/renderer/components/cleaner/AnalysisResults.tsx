import React from "react";
import { Card } from "../Card";
import { JunkFile } from "../../types";
import { CLEANER_NO_FILES_FOUND } from "../../constants";
import {
  AnalysisResultsHeader,
  AnalysisResultsList,
  AnalysisResultsActions,
} from "./";

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
      <AnalysisResultsHeader
        error={error}
        recoverableSpace={recoverableSpace}
        junkFilesCount={junkFiles.length}
        formatBytes={formatBytes}
      />
      <Card className="flex flex-col gap-5">
        {junkFiles.length > 0 ? (
          <>
            <AnalysisResultsList
              junkFiles={junkFiles}
              selectedFiles={selectedFiles}
              formatBytes={formatBytes}
              onFileSelect={onFileSelect}
              onSelectAll={onSelectAll}
            />
            <AnalysisResultsActions
              selectedFiles={selectedFiles}
              junkFiles={junkFiles}
              formatBytes={formatBytes}
              onCleanClick={onCleanClick}
              onAnalyzeAgain={onAnalyzeAgain}
            />
          </>
        ) : (
          <p className="text-center italic text-gray-400">
            {CLEANER_NO_FILES_FOUND}
          </p>
        )}
      </Card>
    </>
  );
};

export default AnalysisResults;
