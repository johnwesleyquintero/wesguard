import React from 'react'; // Removed CSSProperties and CustomStyle as they are no longer needed
// Removed import styles from './components/UsageCard.module.css';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
        {title}
      </h3>
      {isLoading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 text-center">
            {model}
          </p>
          {usagePercentage !== null && (
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Usage
                </span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {usagePercentage.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${usagePercentage}%` }}
                  role="progressbar"
                  aria-valuenow={usagePercentage ?? 0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={title}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsageCard;
