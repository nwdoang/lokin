export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type BoardColumn = {
  id: string;
  projectId: string;
  name: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  projectId: string;
  columnId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null; // YYYY-MM-DD, or null
  labels: string[];
  position: number;
  createdAt: string;
  updatedAt: string;
};
