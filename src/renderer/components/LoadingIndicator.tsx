import React from "react";

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-5 text-foreground">
      <div className="border-4 border-gray-400 border-t-accent rounded-full w-10 h-10 animate-spin mb-2"></div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
