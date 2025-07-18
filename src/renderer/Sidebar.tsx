import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Trash2,
  Bell,
  Shield,
  Settings, // Import Settings icon
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isSidebarCollapsed,
  toggleSidebar,
}) => {
  return (
    <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Shield className="sidebar-logo-icon" /> {/* Added Shield icon */}
        <h1>WesGuard</h1>
        <button className="collapse-button" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="nav">
        <button
          className={`nav-button ${activeView === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveView("dashboard")}
        >
          <LayoutDashboard />
          {!isSidebarCollapsed && <span>Dashboard</span>}
        </button>
        <button
          className={`nav-button ${activeView === "cleaner" ? "active" : ""}`}
          onClick={() => setActiveView("cleaner")}
        >
          <Trash2 /> {/* Changed from Broom to Trash2 */}
          {!isSidebarCollapsed && <span>Cleaner</span>}
        </button>
        <button
          className={`nav-button ${activeView === "reminder" ? "active" : ""}`}
          onClick={() => setActiveView("reminder")}
        >
          <Bell />
          {!isSidebarCollapsed && <span>Reminder</span>}
        </button>
        <button
          className={`nav-button ${activeView === "settings" ? "active" : ""}`}
          onClick={() => setActiveView("settings")}
        >
          <Settings />
          {!isSidebarCollapsed && <span>Settings</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
