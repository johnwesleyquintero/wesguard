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
import {
  useSystemInfoContext,
  useSidebarContext,
} from "./context/SystemInfoContext"; // Import context hooks
import { Menu } from "lucide-react"; // Import Menu icon
import { ErrorBoundary } from "./components/ErrorBoundary"; // Import ErrorBoundary

const App: React.FC = () => {
  const { themeMode } = useSystemInfoContext(); // Get themeMode from context
  const { toggleSidebar } = useSidebarContext(); // Get toggleSidebar from context

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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-secondary-bg text-primary-text shadow-lg"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <ErrorBoundary>
            <Routes>
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/cleaner" element={<CleanerView />} />
              <Route path="/reminder" element={<ReminderView />} />
              <Route path="/chat" element={<ChatView />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route path="/registry" element={<RegistryCleanerView />} />
              <Route path="/ai-optimization" element={<AIOptimizationView />} />
              <Route
                path="/memory-optimizer"
                element={<MemoryOptimizerView />}
              />
              <Route path="/" element={<DashboardView />} />{" "}
              {/* Default route */}
            </Routes>
          </ErrorBoundary>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
