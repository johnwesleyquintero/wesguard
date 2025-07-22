import React from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-3xl text-foreground mb-6" aria-label={title}>
      {title}
    </h2>
  );
};

export default PageHeader;
