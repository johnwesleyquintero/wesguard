import React from "react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>WesGuard</h1>
      </div>
      <nav className="nav">
        <button
          className={`nav-button ${activeView === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveView("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`nav-button ${activeView === "cleaner" ? "active" : ""}`}
          onClick={() => setActiveView("cleaner")}
        >
          Cleaner
        </button>
        <button
          className={`nav-button ${activeView === "reminder" ? "active" : ""}`}
          onClick={() => setActiveView("reminder")}
        >
          Reminder
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
