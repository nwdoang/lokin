export type ProjectSummary = Readonly<{
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}>;

export type ProjectCreateInput = Readonly<{
  name: string;
  description?: string;
}>
