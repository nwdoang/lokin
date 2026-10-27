import { Avatar, AvatarFallback } from "@/core/ui/avatar";
import { Progress } from "@/core/ui/progress.ui";
import type { ProjectSummary } from "@/features/project/types/project.type";
import type { TaskProgress } from "@/features/task/utils/task-progress.util";
import { Link } from "react-router-dom";

const PROJECT_COLORS = [
  "#2563eb",
  "#7c3aed",
  "#c026d3",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#047857",
  "#0891b2",
] as const;

type ProjectCardProps = Readonly<{
  project: ProjectSummary;
  progress: TaskProgress;
}>;

function getProjectColor(projectId: string): string {
  const hash = Array.from(projectId).reduce(
    (value, character) => Math.imul(31, value) + character.codePointAt(0)!,
    0,
  );

  return PROJECT_COLORS[(hash >>> 0) % PROJECT_COLORS.length];
}

function getProjectInitial(name: string): string {
  return Array.from(name.trim())[0]?.toLocaleUpperCase() ?? "P";
}

export function ProjectCard({ project, progress }: ProjectCardProps) {
  const color = getProjectColor(project.id);
  const taskLabel = `${progress.totalTaskCount} ${progress.totalTaskCount === 1 ? "task" : "tasks"}`;

  return (
    <Link
      aria-label={`Open ${project.name}`}
      className="group block min-h-64 rounded-xl outline-none transition-[transform,box-shadow] duration-200 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:-translate-y-1 hover:shadow-md motion-reduce:hover:translate-y-0"
      to={`/projects/${encodeURIComponent(project.id)}`}
    >
      <article className="flex h-full min-h-64 flex-col rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
        <div className="flex items-start gap-3">
          <Avatar className="size-11" aria-hidden="true">
            <AvatarFallback
              className="text-base font-semibold"
              style={{ color, backgroundColor: `${color}33` }}
            >
              {getProjectInitial(project.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 pt-0.5">
            <h2 className="truncate pb-0.5 text-lg font-semibold leading-6 tracking-tight">
              {project.name}
            </h2>
            <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {project.description || "No description yet."}
            </p>
          </div>
        </div>

        <div className="mt-auto space-y-3 pt-8">
          <Progress
            aria-label={`${project.name} completion`}
            aria-valuetext={`${progress.completionPercentage}% complete`}
            value={progress.completionPercentage}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{taskLabel}</span>
            <span>{progress.completionPercentage}% complete</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
