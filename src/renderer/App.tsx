import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardView from "./DashboardView";
import CleanerView from "./CleanerView";
import ReminderView from "./ReminderView";
import ChatView from "./ChatView";
import SettingsView from "./SettingsView"; // Import the new SettingsView

const App: React.FC = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`app ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <main className="main-content">
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "cleaner" && <CleanerView />}
        {activeView === "reminder" && <ReminderView />}
        {activeView === "chat" && <ChatView />}
        {activeView === "settings" && <SettingsView />} {/* Add SettingsView */}
      </main>
    </div>
  );
};

export default App;
