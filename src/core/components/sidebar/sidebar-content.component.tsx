import { ProjectCreateAction } from "@/core/components/sidebar/project-create-action.component";
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/core/ui/sidebar";
import type { ProjectSummary } from "@/features/project/types/project.type";
import { FolderIcon, FolderKanbanIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export type AppSidebarContentProps = Readonly<{
  projects: readonly ProjectSummary[];
  hasSearchQuery: boolean;
  onCreateProject: (name: string) => void;
}>;

export function AppSidebarContent({
  projects,
  hasSearchQuery,
  onCreateProject,
}: AppSidebarContentProps) {
  const { isMobile, setOpenMobile } = useSidebar();

  function closeMobileSidebar(): void {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink
              className="block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              end
              onClick={closeMobileSidebar}
              to="/projects"
            >
              {({ isActive }) => (
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip="Projects"
                >
                  <span>
                    <FolderKanbanIcon />
                    <span>Projects</span>
                  </span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>My projects</SidebarGroupLabel>
        <ProjectCreateAction onCreateProject={onCreateProject} />
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <NavLink
                className="block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
                onClick={closeMobileSidebar}
                to={`/projects/${encodeURIComponent(project.id)}`}
              >
                {({ isActive }) => (
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={project.name}
                  >
                    <span title={project.name}>
                      <FolderIcon />
                      <span className="truncate">{project.name}</span>
                    </span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {projects.length === 0 ? (
          <p className="px-2 py-3 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
            {hasSearchQuery ? "No matching projects" : "No projects yet"}
          </p>
        ) : null}
      </SidebarGroup>
    </SidebarContent>
  );
}
