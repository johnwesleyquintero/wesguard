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
    <div className="bg-secondary p-5 rounded-lg shadow-lg flex flex-col justify-between min-h-[150px]">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4 flex-grow flex items-center">
            {model}
          </p>
          {usagePercentage !== null && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  Usage
                </span>
                <span className="text-xs font-medium text-foreground">
                  {usagePercentage.toFixed(2)}%
                </span>
              </div>
              <div className="bg-muted rounded-lg h-[15px] overflow-hidden relative mt-2">
                <div
                  className="bg-primary h-full rounded-lg transition-[width] duration-300 ease-in-out"
                  style={{ width: `${usagePercentage}%` }}
                  role="progressbar"
                  aria-valuenow={usagePercentage ?? 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={title}
                ></div>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium text-primary-foreground">
                  {usagePercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsageCard;
