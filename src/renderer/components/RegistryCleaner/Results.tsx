import React from "react";
import type { RegistryItem } from "../../types";
import { Button } from "../Button";

interface ResultsProps {
  issues: RegistryItem[];
  onClean: (items: RegistryItem[]) => void;
  onBack: () => void;
  onIgnore: (item: RegistryItem) => void;
}

export const Results: React.FC<ResultsProps> = ({
  issues,
  onClean,
  onBack,
  onIgnore,
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [ignored, setIgnored] = React.useState<string[]>([]);

  const handleToggle = (path: string) => {
    setSelected((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const handleIgnore = (item: RegistryItem) => {
    setIgnored((prev) => [...prev, item.path]);
    onIgnore(item);
  };

  const handleClean = () => {
    const selectedItems = issues.filter(
      (issue) => selected.includes(issue.path) && !ignored.includes(issue.path),
    );
    onClean(selectedItems);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Registry Scan Results</h3>
      <p className="text-gray-600 mb-4">{issues.length} issues found.</p>
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li
            key={issue.path}
            className={`p-4 border rounded-lg shadow-sm ${
              issue.isInvalid
                ? "border-destructive bg-destructive/10"
                : "border-gray-200 bg-white"
            } ${
              selected.includes(issue.path)
                ? "ring-2 ring"
                : "hover:border-gray-300"
            } ${ignored.includes(issue.path) ? "opacity-50 line-through" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={selected.includes(issue.path)}
                  onChange={() => handleToggle(issue.path)}
                  className="mr-3 mt-1 h-5 w-5 text-primary rounded focus:ring"
                  disabled={ignored.includes(issue.path)}
                />
                <div className="flex-grow">
                  <strong className="text-lg text-gray-800 block">
                    {issue.name}
                  </strong>
                  <p className="text-sm text-gray-500 break-all">
                    Path: {issue.path}
                  </p>
                  <p className="text-sm text-gray-500">
                    Value: {issue.value || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: {issue.type || "N/A"}
                  </p>
                  {issue.isInvalid && (
                    <p className="text-sm text-destructive font-medium mt-1">
                      Reason: Invalid entry
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => handleIgnore(issue)}
                disabled={ignored.includes(issue.path)}
                variant="ghost"
                size="small"
              >
                Ignore
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex space-x-4">
        <Button
          onClick={handleClean}
          disabled={selected.length === 0}
          variant="primary"
        >
          Clean Selected ({selected.length})
        </Button>
        <Button onClick={onBack} variant="secondary">
          Back
        </Button>
      </div>
    </div>
  );
};
