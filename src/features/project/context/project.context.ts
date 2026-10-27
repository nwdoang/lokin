import type { ProjectCreateInput, ProjectSummary } from "@/features/project/types/project.type";
import { createContext } from "react";

export type ProjectContextValue = Readonly<{
  projects: readonly ProjectSummary[];
  createProject: (input: ProjectCreateInput) => ProjectSummary;
  openProjectCreateDialog: (
    options?: OpenProjectCreateDialogOptions,
  ) => void;
}>;

export type OpenProjectCreateDialogOptions = Readonly<{
  onCreated?: (project: ProjectSummary) => void;
}>;

export const ProjectContext = createContext<ProjectContextValue | null>(null);
