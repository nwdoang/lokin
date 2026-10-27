import type { ProjectSummary } from "@/features/project/types/project.type";

export const PROJECTS_STORAGE_KEY = "lokin-todos.projects.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseProjectSummary(value: unknown): ProjectSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    (typeof value.description !== "string" &&
      typeof value.description !== "undefined") ||
    typeof value.createdAt !== "string" ||
    typeof value.updatedAt !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    description: value.description ?? "",
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
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
    if (!Array.isArray(parsedProjects)) {
      return [];
    }

    const projects = parsedProjects.map(parseProjectSummary);
    return projects.every((project) => project !== null) ? projects : [];
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
