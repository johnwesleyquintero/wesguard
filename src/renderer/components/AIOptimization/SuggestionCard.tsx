import React from "react";
import { Card } from "../Card";
import { Lightbulb } from "lucide-react";

interface SuggestionCardProps {
  suggestion: string;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
}) => {
  return (
    <Card className="suggestion-card">
      <div className="suggestion-header">
        <Lightbulb size={20} />
        <h3>Optimization Suggestion</h3>
      </div>
      <p>{suggestion}</p>
    </Card>
  );
};
