import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardView from "./DashboardView";
import CleanerView from "./CleanerView";
import ReminderView from "./ReminderView";
import ChatView from "./ChatView";
import SettingsView from "./SettingsView";
import { RegistryCleanerView } from "./RegistryCleanerView";
import AIOptimizationView from "./AIOptimizationView";
import MemoryOptimizerView from "./MemoryOptimizerView";
import { GlobalAppProvider } from "./context/GlobalAppContext.tsx";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <GlobalAppProvider>
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
                <Route path="/" element={<DashboardView />} />{" "}
                {/* Default route */}
              </Routes>
            </main>
            <Toaster />
          </div>
        </GlobalAppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
