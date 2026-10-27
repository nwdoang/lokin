export const DONE_TASK_STATUS = "done";

export type TaskSummary = Readonly<{
  id: string;
  projectId: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}>;
