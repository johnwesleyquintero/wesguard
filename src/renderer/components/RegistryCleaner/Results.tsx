import React from 'react';
import type { RegistryItem } from '../../types';
import { Button } from '../Button';

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
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleIgnore = (item: RegistryItem) => {
    setIgnored((prev) => [...prev, item.path]);
    onIgnore(item);
  };

  const handleClean = () => {
    const selectedItems = issues.filter(
      (issue) => selected.includes(issue.path) && !ignored.includes(issue.path)
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
              selected.includes(issue.path)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            } ${ignored.includes(issue.path) ? 'opacity-50 line-through' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selected.includes(issue.path)}
                  onChange={() => handleToggle(issue.path)}
                  className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  disabled={ignored.includes(issue.path)}
                />
                <div>
                  <strong className="text-lg text-gray-800">
                    {issue.name}
                  </strong>
                  <p className="text-sm text-gray-500">{issue.path}</p>
                  <p className="text-sm text-gray-500">
                    Value: {issue.value || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: {issue.type || 'N/A'}
                  </p>
                  <p className="text-sm text-red-500">
                    Reason: {issue.isInvalid ? 'Invalid entry' : 'N/A'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleIgnore(issue)}
                disabled={ignored.includes(issue.path)}
                className="ml-4 px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
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
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          Clean Selected
        </Button>
        <Button
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Back
        </Button>
      </div>
    </div>
  );
};
