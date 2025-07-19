import { createContext, useContext } from "react";
import { SystemInfo } from "../types"; // Changed from hooks/useSystemInfo to types

interface GlobalAppContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  systemInfo: SystemInfo | null;
  isLoading: boolean;
}

export const GlobalAppContext = createContext<GlobalAppContextType | undefined>(
  undefined,
);

export const useGlobalAppContext = () => {
  const context = useContext(GlobalAppContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalAppContext must be used within a GlobalAppProvider",
    );
  }
  return context;
};
