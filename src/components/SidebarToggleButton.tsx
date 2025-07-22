import React from "react";
import { Menu } from "lucide-react";
import { useSidebarContext } from "../renderer/context/SystemInfoContext"; // Adjust path as needed
import { cn } from "@/lib/utils"; // Assuming cn is available at this path

const SidebarToggleButton: React.FC = () => {
  const { toggleSidebar } = useSidebarContext();

  return (
    <button
      className={cn(
        "md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-secondary-bg text-primary-text shadow-lg",
      )}
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <Menu size={24} />
    </button>
  );
};

export default SidebarToggleButton;
