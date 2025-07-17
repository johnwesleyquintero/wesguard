import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardView from "./DashboardView";
import CleanerView from "./CleanerView";

const App: React.FC = () => {
  const [activeView, setActiveView] = useState("dashboard");

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === "dashboard" && <DashboardView />}
        {activeView === "cleaner" && <CleanerView />}
      </main>
    </div>
  );
};

export default App;
