import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageContent from "../components/PageContent"; // Import PageContent component
import SidebarToggleButton from "../components/SidebarToggleButton"; // Import SidebarToggleButton
import { useSystemInfoContext } from "./context/SystemInfoContext"; // Import context hooks
import { ErrorBoundary } from "./components/ErrorBoundary"; // Import ErrorBoundary
import LoadingIndicator from "./components/LoadingIndicator"; // Import LoadingIndicator

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
  const { themeMode } = useSystemInfoContext(); // Get themeMode from context

  // Apply dark class to html element based on themeMode
  React.useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeMode]);

  return (
    <BrowserRouter>
      <div className="flex h-screen">
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
                <Route path="/" element={<DashboardView />} />{" "}
                {/* Default route */}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </PageContent>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
