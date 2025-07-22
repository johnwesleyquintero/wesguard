import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  callToAction?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  message,
  callToAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-5 text-muted-foreground">
      {icon && (
        <div className="mb-4 [&>svg]:w-16 [&>svg]:h-16 [&>svg]:text-accent-foreground">
          {icon}
        </div>
      )}
      <p className="text-lg mb-2">{message}</p>
      {callToAction && <div className="mt-2">{callToAction}</div>}
    </div>
  );
};

export default EmptyState;
