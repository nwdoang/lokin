import { DONE_TASK_STATUS, type TaskSummary } from "@/features/task/types/task.type";

export const TASKS_STORAGE_KEY = "lokin-todos.tasks.v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// under development, not yet used
function parseTaskSummary(value: unknown): TaskSummary | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.projectId !== "string" ||
    typeof value.title !== "string" ||
    typeof value.createdAt !== "string" ||
    typeof value.updatedAt !== "string"
  ) {
    return null;
  }

  const status =
    typeof value.status === "string"
      ? value.status
      : typeof value.isDone === "boolean"
        ? value.isDone
          ? DONE_TASK_STATUS
          : "todo"
        : null;

  if (status === null || status.trim().length === 0) {
    return null;
  }

  return {
    id: value.id,
    projectId: value.projectId,
    title: value.title,
    status,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

export function readTasks(
  storage: Storage = window.localStorage,
): readonly TaskSummary[] {
  try {
    const storedTasks = storage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks === null) {
      return [];
    }

    const parsedTasks: unknown = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    const tasks = parsedTasks.map(parseTaskSummary);
    return tasks.every((task) => task !== null) ? tasks : [];
  } catch {
    return [];
  }
}
