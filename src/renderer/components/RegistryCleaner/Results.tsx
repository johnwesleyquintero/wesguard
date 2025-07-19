import React from "react";
import type { RegistryItem } from "../../types";
import { Button } from "../Button";

interface ResultsProps {
  issues: RegistryItem[];
  onClean: (items: RegistryItem[]) => void;
  onBack: () => void;
}

export const Results: React.FC<ResultsProps> = ({
  issues,
  onClean,
  onBack,
}) => {
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (path: string) => {
    setSelected((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path],
    );
  };

  const handleClean = () => {
    const selectedItems = issues.filter((issue) =>
      selected.includes(issue.path),
    );
    onClean(selectedItems);
  };

  return (
    <div>
      <h3>Registry Scan Results</h3>
      <p>{issues.length} issues found.</p>
      <ul>
        {issues.map((issue) => (
          <li key={issue.path}>
            <input
              type="checkbox"
              checked={selected.includes(issue.path)}
              onChange={() => handleToggle(issue.path)}
            />
            <strong>{issue.name}</strong>
            <p>{issue.path}</p>
            <p>Reason: Invalid file path</p>
          </li>
        ))}
      </ul>
      <Button onClick={handleClean} disabled={selected.length === 0}>
        Clean Selected
      </Button>
      <Button onClick={onBack}>Back</Button>
    </div>
  );
};
