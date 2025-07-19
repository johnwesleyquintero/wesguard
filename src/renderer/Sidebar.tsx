import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Trash2,
  Bell,
  Shield,
  MessageSquare,
  Settings,
  FileJson,
  Zap, // For AI Optimization
  HardDrive, // For Memory Optimizer
} from "lucide-react";
import { useGlobalAppContext } from "./context/SystemInfoContext";

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useGlobalAppContext();

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Shield className="sidebar-logo-icon" /> {/* Added Shield icon */}
        <h1>WesGuard</h1>
        <button
          className="collapse-button"
          onClick={toggleSidebar}
          aria-label={
            isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className="nav" aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Dashboard"
        >
          <LayoutDashboard />
          {!isSidebarCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/cleaner"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Cleaner"
        >
          <Trash2 />
          {!isSidebarCollapsed && <span>Cleaner</span>}
        </NavLink>
        <NavLink
          to="/ai-optimization"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="AI Optimization"
        >
          <Zap />
          {!isSidebarCollapsed && <span>AI Optimization</span>}
        </NavLink>
        <NavLink
          to="/memory-optimizer"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Memory Optimizer"
        >
          <HardDrive />
          {!isSidebarCollapsed && <span>Memory Optimizer</span>}
        </NavLink>
        <NavLink
          to="/registry"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Registry"
        >
          <FileJson />
          {!isSidebarCollapsed && <span>Registry</span>}
        </NavLink>
        <NavLink
          to="/reminder"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Reminder"
        >
          <Bell />
          {!isSidebarCollapsed && <span>Reminder</span>}
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="WesGuard AI Chat"
        >
          <MessageSquare />
          {!isSidebarCollapsed && <span>WesGuardAI</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`}
          aria-label="Settings"
        >
          <Settings />
          {!isSidebarCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
