import { useParams } from "react-router-dom";

export function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">Project details</h1>
      <p className="text-sm text-muted-foreground">
        Project ID: <code>{projectId ?? "Unknown"}</code>
      </p>
    </section>
  );
}
