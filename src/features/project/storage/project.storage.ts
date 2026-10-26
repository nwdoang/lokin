import type { ProjectSummary } from "@/features/project/types/project.type";

export const PROJECTS_STORAGE_KEY = "lokin-todos.projects.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isProjectSummary(value: unknown): value is ProjectSummary {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

export function readProjects(
  storage: Storage = window.localStorage,
): ProjectSummary[] {
  try {
    const storedProjects = storage.getItem(PROJECTS_STORAGE_KEY);
    if (storedProjects === null) {
      return [];
    }

    const parsedProjects: unknown = JSON.parse(storedProjects);
    return Array.isArray(parsedProjects) &&
      parsedProjects.every(isProjectSummary)
      ? parsedProjects
      : [];
  } catch {
    return [];
  }
}

export function writeProjects(
  projects: readonly ProjectSummary[],
  storage: Storage = window.localStorage,
): void {
  storage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}
