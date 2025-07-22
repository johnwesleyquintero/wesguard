import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "flat";
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = "default",
  ...props
}) => {
  const baseClasses = `rounded-lg p-4 text-card-foreground ${className || ""}`;
  const defaultVariantClasses = "bg-card shadow-lg";
  const flatVariantClasses = "bg-muted border border-border";

  const cardClasses = `${baseClasses} ${
    variant === "flat" ? flatVariantClasses : defaultVariantClasses
  }`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};
