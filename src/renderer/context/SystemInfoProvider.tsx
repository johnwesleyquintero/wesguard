import React, { useState, ReactNode, useCallback } from "react";
import { useSystemInfo } from "../hooks/useSystemInfo";
import { SystemInfoContext, ThemeMode } from "./SystemInfoContext"; // Import SystemInfoContext and ThemeMode

interface SystemInfoProviderProps {
  children: ReactNode;
}

export const SystemInfoProvider: React.FC<SystemInfoProviderProps> = ({
  children,
}) => {
  const { systemInfo, metrics, historicalData, isLoading } = useSystemInfo();
  const [themeMode, setThemeMode] = useState<ThemeMode>("light"); // Default to light mode

  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode: ThemeMode) =>
      prevMode === "light" ? "dark" : "light",
    );
  }, []);

  return (
    <SystemInfoContext.Provider
      value={{
        systemInfo,
        metrics,
        historicalData,
        isLoading,
        themeMode,
        toggleTheme,
      }}
    >
      {children}
    </SystemInfoContext.Provider>
  );
};
