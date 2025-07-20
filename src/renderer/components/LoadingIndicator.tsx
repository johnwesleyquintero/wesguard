import React from 'react';
import styles from './LoadingIndicator.module.css';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className={styles.loadingIndicator}>
      <div className={styles.spinner}></div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
