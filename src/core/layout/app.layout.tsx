import { AppHeader } from "@/core/components/header/app-header.component";
import { AppSidebar } from "@/core/components/sidebar/app-sidebar.component";
import { SidebarInset, SidebarProvider } from "@/core/ui/sidebar";
import { TooltipProvider } from "@/core/ui/tooltip";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar searchQuery={searchQuery} />
        <SidebarInset>
          <AppHeader
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          <div className="flex flex-1 flex-col p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
