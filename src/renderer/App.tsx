import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageContent from "../components/PageContent";
import SidebarToggleButton from "../components/SidebarToggleButton";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingIndicator from "./components/LoadingIndicator";
import { ThemeProvider } from "./context/ThemeProvider";

// Direct imports for view components
import DashboardView from "./DashboardView";
import CleanerView from "./CleanerView";
import ReminderView from "./ReminderView";
import ChatView from "./ChatView";
import SettingsView from "./SettingsView";
import { RegistryCleanerView } from "./RegistryCleanerView";
import AIOptimizationView from "./AIOptimizationView";
import MemoryOptimizerView from "./MemoryOptimizerView";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-background text-foreground transition-colors duration-150">
          <Sidebar />
          <PageContent padding="p-4 md:p-6 lg:p-8">
            <SidebarToggleButton />
            <ErrorBoundary>
              <Suspense fallback={<LoadingIndicator />}>
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
                  <Route path="/" element={<DashboardView />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </PageContent>
          <Toaster />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
