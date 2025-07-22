import React from "react";
import clsx from "clsx";

interface PageContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  padding = "p-4 sm:p-6 lg:p-8",
}) => {
  return (
    <main className={clsx("flex-1 overflow-y-auto", padding, className)}>
      {children}
    </main>
  );
};

export default PageContent;
