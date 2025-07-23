import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ReminderView from "./ReminderView";
import ChatView from "./ChatView";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState("reminder");
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
        {activeView === "reminder" && <ReminderView />}
        {activeView === "chat" && <ChatView />}
      </main>
    </div>
  );
};

export default App;
