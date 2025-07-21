import React from 'react';
import { NavLink } from 'react-router-dom';
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
import { useSidebarContext } from './context/SystemInfoContext';

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarContext();

  const baseNavLinkClasses =
    'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50';
  const activeNavLinkClasses =
    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50';

  return (
    <aside
      className={`flex flex-col border-r bg-white p-4 dark:bg-gray-950 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      } hidden md:flex transition-all duration-300`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-blue-600" />
          {!isSidebarCollapsed && <span>WesGuard</span>}
        </div>
        <button
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          onClick={toggleSidebar}
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 space-y-1 py-4" aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Dashboard"
        >
          <LayoutDashboard className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/cleaner"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Cleaner"
        >
          <Trash2 className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Cleaner</span>}
        </NavLink>
        <NavLink
          to="/ai-optimization"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="AI Optimization"
        >
          <Zap className="h-5 w-5" />
          {!isSidebarCollapsed && <span>AI Optimization</span>}
        </NavLink>
        <NavLink
          to="/memory-optimizer"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Memory Optimizer"
        >
          <HardDrive className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Memory Optimizer</span>}
        </NavLink>
        <NavLink
          to="/registry"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Registry"
        >
          <FileJson className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Registry</span>}
        </NavLink>
        <NavLink
          to="/reminder"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Reminder"
        >
          <Bell className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Reminder</span>}
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="WesGuard AI Chat"
        >
          <MessageSquare className="h-5 w-5" />
          {!isSidebarCollapsed && <span>WesGuardAI</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseNavLinkClasses} ${isActive ? activeNavLinkClasses : ''}`
          }
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
          {!isSidebarCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
