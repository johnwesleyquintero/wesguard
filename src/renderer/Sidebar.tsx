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
  Zap,
  HardDrive,
  Sun,
  Moon,
} from "lucide-react";
import { useSidebarContext } from "./context/SystemInfoContext";
import { useTheme } from "./hooks/useTheme";

const navLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    ariaLabel: "Dashboard",
  },
  { to: "/cleaner", label: "Cleaner", icon: Trash2, ariaLabel: "Cleaner" },
  {
    to: "/ai-optimization",
    label: "AI Optimization",
    icon: Zap,
    ariaLabel: "AI Optimization",
  },
  {
    to: "/memory-optimizer",
    label: "Memory Optimizer",
    icon: HardDrive,
    ariaLabel: "Memory Optimizer",
  },
  { to: "/registry", label: "Registry", icon: FileJson, ariaLabel: "Registry" },
  { to: "/reminder", label: "Reminder", icon: Bell, ariaLabel: "Reminder" },
  {
    to: "/chat",
    label: "WesGuardAI",
    icon: MessageSquare,
    ariaLabel: "WesGuard AI Chat",
  },
  { to: "/settings", label: "Settings", icon: Settings, ariaLabel: "Settings" },
];

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useSidebarContext();

  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
      isActive
        ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
        : ""
    }`;

  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={`flex flex-col border-r bg-white p-4 dark:bg-gray-950 ${
        isSidebarCollapsed ? "w-16" : "w-64"
      } hidden md:flex transition-all duration-300`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-blue-600" />
          {!isSidebarCollapsed && <span>WesGuard</span>}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <button
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
            onClick={toggleSidebar}
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <nav className="flex-1 space-y-1 py-4" aria-label="Main navigation">
        {navLinks.map(({ to, label, icon: Icon, ariaLabel }) => (
          <NavLink
            key={to}
            to={to}
            className={getNavLinkClassName}
            aria-label={ariaLabel}
          >
            <Icon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
