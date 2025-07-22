import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  className,
  children,
  ariaLabel,
  ...props
}) => {
  const baseClasses =
    "border-none rounded-md text-base cursor-pointer transition-colors text-center";
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-foreground text-primary-foreground",
    secondary: "bg-secondary hover:bg-border text-secondary-foreground",
    danger:
      "bg-destructive hover:bg-[oklch(0.65_0.2_20)] text-primary-foreground",
    ghost:
      "bg-transparent text-muted-foreground border border-border hover:bg-muted hover:text-foreground",
  };

  const disabledClasses =
    "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70";

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className || ""}`;

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
};
