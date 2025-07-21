import React from 'react';
import { JunkFile } from '../../types';

interface AnalysisResultsListItemProps {
  file: JunkFile;
  selected: boolean;
  onFileSelect: (filePath: string) => void;
  formatBytes: (bytes: number) => string;
  style: React.CSSProperties;
}

const AnalysisResultsListItem: React.FC<AnalysisResultsListItemProps> = ({
  file,
  selected,
  onFileSelect,
  formatBytes,
  style,
}) => {
  return (
    <div
      key={`${file.path}-${file.lastModified}`}
      className={`grid grid-cols-[20px_2fr_3fr_1.5fr_1fr] gap-x-2 px-4 py-2 items-center border-b border-dashed border-gray-700 last:border-b-0 cursor-pointer ${
        selected ? 'bg-blue-700/20' : ''
      }`}
      role="row"
      tabIndex={0}
      onClick={() => onFileSelect(file.path)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onFileSelect(file.path);
        }
      }}
      aria-selected={selected}
      style={style}
    >
      <input
        type="checkbox"
        id={`file-checkbox-${file.path}`}
        checked={selected}
        onChange={() => onFileSelect(file.path)}
        aria-labelledby={`file-name-${file.path}`}
        tabIndex={-1}
        className="form-checkbox h-4 w-4 text-blue-600 rounded"
      />
      <span id={`file-name-${file.path}`} className="truncate" role="gridcell">
        {file.name}
      </span>
      <span className="truncate text-gray-400 text-sm" role="gridcell">
        {file.path}
      </span>
      <span className="truncate text-gray-400 text-sm" role="gridcell">
        {new Date(file.lastModified).toLocaleString()}
      </span>
      <span className="truncate text-right" role="gridcell">
        {formatBytes(file.size)}
      </span>
    </div>
  );
};

export default AnalysisResultsListItem;
