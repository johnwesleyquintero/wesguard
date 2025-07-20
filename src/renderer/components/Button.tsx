import React from 'react';
import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  ariaLabel?: string; // Added ariaLabel prop
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ariaLabel, // Destructure ariaLabel
  ...props
}) => {
  const classes = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
};
