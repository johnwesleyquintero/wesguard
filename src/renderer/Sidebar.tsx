import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Shield,
  MessageSquare,
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
          className={`nav-button ${activeView === "reminder" ? "active" : ""}`}
          onClick={() => setActiveView("reminder")}
        >
          <Bell />
          {!isSidebarCollapsed && <span>Reminder</span>}
        </button>
        <button
          className={`nav-button ${activeView === "chat" ? "active" : ""}`}
          onClick={() => setActiveView("chat")}
        >
          <MessageSquare />
          {!isSidebarCollapsed && <span>WesGuardAI</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
