import React from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <h2 className={styles.pageHeader} aria-label={title}>
      {title}
    </h2>
  );
};

export default PageHeader;
