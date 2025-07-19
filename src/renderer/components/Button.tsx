import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const baseClasses = "btn";
  const variantClasses = `btn-${variant}`;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className || ""}`}
      {...props}
    />
  );
};
