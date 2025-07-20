import React from 'react';
import { NavLink } from 'react-router-dom';
// Removed unused import: import styles from "./styles.module.css";
import sidebarStyles from './components/Sidebar.module.css'; // Import sidebar specific styles
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
} from 'lucide-react';
import { useSidebarContext } from './context/SystemInfoContext'; // Use the correct context hook

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarContext(); // Use the correct context hook

  return (
    <aside
      className={`${sidebarStyles.sidebar} ${isSidebarCollapsed ? sidebarStyles.collapsed : ''}`}
    >
      <div className={sidebarStyles.sidebarHeader}>
        <Shield className={sidebarStyles.sidebarLogoIcon} />{' '}
        {/* Added Shield icon */}
        <h1>WesGuard</h1>
        <button
          className={sidebarStyles.collapseButton}
          onClick={toggleSidebar}
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
        >
          {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <nav className={sidebarStyles.nav} aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="Dashboard"
        >
          <LayoutDashboard />
          {!isSidebarCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/cleaner"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="Cleaner"
        >
          <Trash2 />
          {!isSidebarCollapsed && <span>Cleaner</span>}
        </NavLink>
        <NavLink
          to="/ai-optimization"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="AI Optimization"
        >
          <Zap />
          {!isSidebarCollapsed && <span>AI Optimization</span>}
        </NavLink>
        <NavLink
          to="/memory-optimizer"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="Memory Optimizer"
        >
          <HardDrive />
          {!isSidebarCollapsed && <span>Memory Optimizer</span>}
        </NavLink>
        <NavLink
          to="/registry"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="Registry"
        >
          <FileJson />
          {!isSidebarCollapsed && <span>Registry</span>}
        </NavLink>
        <NavLink
          to="/reminder"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="Reminder"
        >
          <Bell />
          {!isSidebarCollapsed && <span>Reminder</span>}
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
          aria-label="WesGuard AI Chat"
        >
          <MessageSquare />
          {!isSidebarCollapsed && <span>WesGuardAI</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${sidebarStyles.navButton} ${isActive ? sidebarStyles.active : ''}`
          }
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
