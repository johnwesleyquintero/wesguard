import React, { ReactNode } from 'react';
import useSystemInfo from '../hooks/useSystemInfo';
import { SystemInfoContext } from './SystemInfoContext'; // Import SystemInfoContext

interface SystemInfoProviderProps {
  children: ReactNode;
}

export const SystemInfoProvider: React.FC<SystemInfoProviderProps> = ({
  children,
}) => {
  const { systemInfo, isLoading } = useSystemInfo();

  return (
    <SystemInfoContext.Provider value={{ systemInfo, isLoading }}>
      {children}
    </SystemInfoContext.Provider>
  );
};
