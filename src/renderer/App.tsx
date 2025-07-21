import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import CleanerView from './CleanerView';
import ReminderView from './ReminderView';
import ChatView from './ChatView';
import SettingsView from './SettingsView';
import { RegistryCleanerView } from './RegistryCleanerView';
import AIOptimizationView from './AIOptimizationView';
import MemoryOptimizerView from './MemoryOptimizerView';
import { SidebarProvider } from './context/SidebarProvider'; // Import new provider
import { SystemInfoProvider } from './context/SystemInfoProvider'; // Import new provider
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { useSystemInfoContext } from './context/SystemInfoContext'; // Import context hook

const App: React.FC = () => {
  const { themeMode } = useSystemInfoContext(); // Get themeMode from context

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode === 'light' ? theme.light : theme.dark}>
        <GlobalStyles />
        <SidebarProvider>
          {' '}
          {/* Use SidebarProvider */}
          <SystemInfoProvider>
            {' '}
            {/* Use SystemInfoProvider */}
            <div className="app">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route path="/dashboard" element={<DashboardView />} />
                  <Route path="/cleaner" element={<CleanerView />} />
                  <Route path="/reminder" element={<ReminderView />} />
                  <Route path="/chat" element={<ChatView />} />
                  <Route path="/settings" element={<SettingsView />} />
                  <Route path="/registry" element={<RegistryCleanerView />} />
                  <Route
                    path="/ai-optimization"
                    element={<AIOptimizationView />}
                  />
                  <Route
                    path="/memory-optimizer"
                    element={<MemoryOptimizerView />}
                  />
                  <Route path="/" element={<DashboardView />} />{' '}
                  {/* Default route */}
                </Routes>
              </main>
              <Toaster />
            </div>
          </SystemInfoProvider>
        </SidebarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
