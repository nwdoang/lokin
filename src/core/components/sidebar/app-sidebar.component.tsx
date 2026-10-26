import { AppSidebarContent } from "@/core/components/sidebar/sidebar-content.component";
import { AppSidebarFooter } from "@/core/components/sidebar/sidebar-footer.component";
import { AppSidebarHeader } from "@/core/components/sidebar/sidebar-header.component";
import type { UserProfile } from "@/core/components/sidebar/types/sidebar.type";
import { Sidebar, SidebarRail } from "@/core/ui/sidebar";
import { useProjects } from "@/features/project/hooks/use-projects.hook";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const APP_METADATA = {
  name: "Lokin Todos",
  version: "0.0.0",
} as const;

const LOCAL_USER: UserProfile = {
  name: "Local User",
  email: "local@lokin.app",
  avatarUrl: null,
};

type AppSidebarProps = Readonly<{
  searchQuery: string;
}>;

export function AppSidebar({ searchQuery }: AppSidebarProps) {
  const navigate = useNavigate();
  const { projects, createProject } = useProjects();
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.name.toLocaleLowerCase().includes(normalizedSearchQuery),
      ),
    [normalizedSearchQuery, projects],
  );

  function handleCreateProject(name: string): void {
    const project = createProject(name);
    navigate(`/projects/${encodeURIComponent(project.id)}`);
  }

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader
        appName={APP_METADATA.name}
        version={APP_METADATA.version}
      />
      <AppSidebarContent
        projects={filteredProjects}
        hasSearchQuery={normalizedSearchQuery.length > 0}
        onCreateProject={handleCreateProject}
      />
      <AppSidebarFooter user={LOCAL_USER} />
      <SidebarRail />
    </Sidebar>
  );
}
