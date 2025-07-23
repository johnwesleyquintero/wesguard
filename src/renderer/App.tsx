import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageContent from "../components/PageContent";
import SidebarToggleButton from "../components/SidebarToggleButton";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingIndicator from "./components/LoadingIndicator";
import { ThemeProvider } from "./context/ThemeProvider";

// Lazy load view components
const DashboardView = lazy(() => import("./DashboardView"));
const CleanerView = lazy(() => import("./CleanerView"));
const ReminderView = lazy(() => import("./ReminderView"));
const ChatView = lazy(() => import("./ChatView"));
const SettingsView = lazy(() => import("./SettingsView"));
const RegistryCleanerView = lazy(() =>
  import("./RegistryCleanerView").then((module) => ({
    default: module.RegistryCleanerView,
  })),
);
const AIOptimizationView = lazy(() => import("./AIOptimizationView"));
const MemoryOptimizerView = lazy(() => import("./MemoryOptimizerView"));

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
