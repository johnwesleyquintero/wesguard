import { createContext, useContext } from 'react';
import { SystemInfo } from '../types';

// Define the type for System Info Context
interface SystemInfoContextType {
  systemInfo: SystemInfo | null;
  isLoading: boolean;
}

// Define the type for Sidebar Context
interface SidebarContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

// Create System Info Context
export const SystemInfoContext = createContext<
  SystemInfoContextType | undefined
>(undefined);

// Create Sidebar Context
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

// Custom hook for System Info Context
export const useSystemInfoContext = () => {
  const context = useContext(SystemInfoContext);
  if (context === undefined) {
    throw new Error(
      'useSystemInfoContext must be used within a SystemInfoProvider'
    );
  }
  return context;
};

// Custom hook for Sidebar Context
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
