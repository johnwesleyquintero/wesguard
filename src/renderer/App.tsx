import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardView from "./DashboardView";
import CleanerView from "./CleanerView";
import ReminderView from "./ReminderView";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "cleaner" && <CleanerView />}
        {activeView === "reminder" && <ReminderView />}
      </main>
    </div>
  );
};

export default App;
