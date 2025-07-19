import React from "react";
import styles from "./styles.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "info" | "success" | "warning" | "error";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  className,
  children,
  ...props
}) => {
  const classes = [styles.badge, styles[`badge-${variant}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
