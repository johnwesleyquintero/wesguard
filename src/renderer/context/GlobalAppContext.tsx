import React, { useState, ReactNode, useCallback } from "react";
import useSystemInfo from "../hooks/useSystemInfo";
import { GlobalAppContext } from "./SystemInfoContext"; // Import from new location

interface GlobalAppProviderProps {
  children: ReactNode;
}

export const GlobalAppProvider: React.FC<GlobalAppProviderProps> = ({
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { systemInfo, isLoading } = useSystemInfo();

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <GlobalAppContext.Provider
      value={{ isSidebarCollapsed, toggleSidebar, systemInfo, isLoading }}
    >
      {children}
    </GlobalAppContext.Provider>
  );
};
