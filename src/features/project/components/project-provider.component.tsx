import { ProjectCreateDialog } from "@/features/project/components/project-create-dialog.component";
import { ProjectContext, type OpenProjectCreateDialogOptions } from "@/features/project/context/project.context";
import { readProjects, writeProjects } from "@/features/project/storage/project.storage";
import type { ProjectCreateInput, ProjectSummary } from "@/features/project/types/project.type";
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";

type ProjectProviderProps = Readonly<{
  children: ReactNode;
}>;

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<readonly ProjectSummary[]>(readProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const onCreatedRef = useRef<((project: ProjectSummary) => void) | null>(null);

  const createProject = useCallback(
    (input: ProjectCreateInput): ProjectSummary => {
      const name = input.name.trim();
      if (name.length === 0) {
        throw new Error("Project name is required.");
      }

      const timestamp = new Date().toISOString();
      const project: ProjectSummary = {
        id: crypto.randomUUID(),
        name,
        description: input.description?.trim() ?? "",
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      const nextProjects = [...projects, project];
      writeProjects(nextProjects);
      setProjects(nextProjects);

      return project;
    },
    [projects],
  );

  const openProjectCreateDialog = useCallback(
    (options?: OpenProjectCreateDialogOptions): void => {
      onCreatedRef.current = options?.onCreated ?? null;
      setIsCreateDialogOpen(true);
    },
    [],
  );

  const handleDialogOpenChange = useCallback((open: boolean): void => {
    setIsCreateDialogOpen(open);
    if (!open) {
      onCreatedRef.current = null;
    }
  }, []);

  const handleCreateProject = useCallback(
    (input: ProjectCreateInput): void => {
      const project = createProject(input);
      const onCreated = onCreatedRef.current;

      setIsCreateDialogOpen(false);
      onCreatedRef.current = null;
      onCreated?.(project);
    },
    [createProject],
  );

  const value = useMemo(
    () => ({ projects, createProject, openProjectCreateDialog }),
    [createProject, openProjectCreateDialog, projects],
  );

  return (
    <ProjectContext.Provider value={value}>
      {children}
      <ProjectCreateDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleCreateProject}
      />
    </ProjectContext.Provider>
  );
}
