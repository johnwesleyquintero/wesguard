import React from "react";
import { cn } from "@/lib/utils"; // Assuming cn is available at this path

interface PageContentProps {
  children: React.ReactNode;
  className?: string; // For any additional classes
  padding?: string; // To pass padding classes like "p-4 md:p-6 lg:p-8"
}

const PageContent: React.FC<PageContentProps> = ({
  children,
  className,
  padding,
}) => {
  return (
    <main className={cn(`flex-1 overflow-y-auto ${padding || ""}`, className)}>
      {children}
    </main>
  );
};

export default PageContent;
