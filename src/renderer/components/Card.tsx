import React from "react";
import styles from "./styles.module.css";

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
  const classes = [styles.card, styles[`card-${variant}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
