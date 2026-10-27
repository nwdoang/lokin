import { DONE_TASK_STATUS, type TaskSummary } from "@/features/task/types/task.type";

export type TaskProgress = Readonly<{
  totalTaskCount: number;
  completedTaskCount: number;
  completionPercentage: number;
}>;

export function calculateProjectTaskProgress(
  tasks: readonly TaskSummary[],
  projectId: string,
): TaskProgress {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);
  const completedTaskCount = projectTasks.filter(
    (task) => task.status === DONE_TASK_STATUS,
  ).length;
  const completionPercentage =
    projectTasks.length === 0
      ? 0
      : Math.round((completedTaskCount / projectTasks.length) * 100);

  return {
    totalTaskCount: projectTasks.length,
    completedTaskCount,
    completionPercentage: Math.min(100, Math.max(0, completionPercentage)),
  };
}
