import React from "react";

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
                style={{ width: `${usagePercentage}%` }}
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
