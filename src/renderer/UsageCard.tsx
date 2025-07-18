import React, { CSSProperties } from "react";

// Define a type for styles that includes custom properties
interface CustomStyle extends CSSProperties {
  "--progress-width"?: string;
}

interface UsageCardProps {
  title: string;
  model: string;
  usagePercentage: number | null;
  isLoading: boolean;
}

const UsageCard: React.FC<UsageCardProps> = ({
  title,
  model,
  usagePercentage,
  isLoading,
}) => {
  return (
    <div className="usage-card">
      <h3>{title}</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="model">{model}</p>
          {usagePercentage !== null && (
            <div className="usage-bar-container">
              <div
                className="usage-bar"
                style={
                  {
                    "--progress-width": `${usagePercentage}%`,
                  } as CustomStyle
                }
                role="progressbar"
                aria-valuenow={usagePercentage ?? 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={title}
              ></div>
              <span className="usage-percentage">
                {usagePercentage.toFixed(2)}%
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsageCard;
