import React, { useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { JunkFile } from "../../types";
import {
  CLEANER_FILES_TO_CLEAN_HEADER,
  CLEANER_SELECT_ALL,
} from "../../constants";
import AnalysisResultsListItem from "./AnalysisResultsListItem";

type SortKey = "name" | "size" | "lastModified";

interface AnalysisResultsListProps {
  junkFiles: JunkFile[];
  selectedFiles: string[];
  formatBytes: (bytes: number) => string;
  onFileSelect: (filePath: string) => void;
  onSelectAll: () => void;
}

const AnalysisResultsList: React.FC<AnalysisResultsListProps> = ({
  junkFiles,
  selectedFiles,
  formatBytes,
  onFileSelect,
  onSelectAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedAndFilteredFiles = useMemo(() => {
    const files = [...junkFiles].filter(
      (file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.path.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    files.sort((a, b) => {
      if (sortKey === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortKey === "size") {
        return sortDirection === "asc" ? a.size - b.size : b.size - a.size;
      } else if (sortKey === "lastModified") {
        return sortDirection === "asc"
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
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortDirection === "asc" ? " ▲" : " ▼";
    }
    return "";
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
      <AnalysisResultsListItem
        file={file}
        selected={selectedFiles.includes(file.path)}
        onFileSelect={onFileSelect}
        formatBytes={formatBytes}
        style={style}
      />
    );
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
        <h3 className="m-0 text-base">{CLEANER_FILES_TO_CLEAN_HEADER}</h3>
        <input
          type="text"
          id="search-files"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="px-3 py-1 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring w-full sm:w-auto mt-2 sm:mt-0"
          aria-label="Search files"
        />
        <label
          htmlFor="select-all-checkbox"
          className="flex items-center gap-1 text-sm cursor-pointer mt-2 sm:mt-0"
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
            className="form-checkbox h-4 w-4 text-primary rounded"
          />
          {CLEANER_SELECT_ALL}
        </label>
      </div>
      <div className="file-list-container" role="grid">
        <div
          className="grid grid-cols-[20px_2fr_3fr_1.5fr_1fr] gap-x-2 px-4 py-2 font-bold bg-gray-700 border-b border-gray-600 text-sm sm:text-base hidden sm:grid"
          role="rowgroup"
        >
          <div role="row" className="contents">
            {" "}
            {/* Use contents to keep grid flow */}
            <div className="hidden sm:block" role="columnheader"></div>{" "}
            {/* Empty div for checkbox column on larger screens */}
            <div
              role="columnheader"
              tabIndex={0}
              onClick={() => handleSort("name")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSort("name");
                }
              }}
              aria-sort={
                sortKey === "name"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className="cursor-pointer hover:text-blue-400 col-span-full sm:col-span-1"
            >
              Name{getSortIndicator("name")}
            </div>
            <div role="columnheader" className="col-span-full sm:col-span-1">
              Path
            </div>
            <div
              role="columnheader"
              tabIndex={0}
              onClick={() => handleSort("lastModified")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSort("lastModified");
                }
              }}
              aria-sort={
                sortKey === "lastModified"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className="cursor-pointer hover:text-blue-400 col-span-full sm:col-span-1"
            >
              Last Modified{getSortIndicator("lastModified")}
            </div>
            <div
              role="columnheader"
              tabIndex={0}
              onClick={() => handleSort("size")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSort("size");
                }
              }}
              aria-sort={
                sortKey === "size"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              className="cursor-pointer hover:text-blue-400 col-span-full sm:col-span-1"
            >
              Size{getSortIndicator("size")}
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
  );
};

export default AnalysisResultsList;
