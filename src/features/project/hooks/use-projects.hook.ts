import { ProjectContext, type ProjectContextValue } from "@/features/project/context/project.context";
import { useContext } from "react";

export function useProjects(): ProjectContextValue {
  const context = useContext(ProjectContext);

  if (context === null) {
    throw new Error("useProjects must be used within a ProjectProvider.");
  }

  return context;
}
