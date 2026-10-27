import { ProjectCard } from "@/features/project/components/project-card.component";
import { ProjectCreateCard } from "@/features/project/components/project-create-card.component";
import { useProjects } from "@/features/project/hooks/use-projects.hook";
import { readTasks } from "@/features/task/storage/task.storage";
import { calculateProjectTaskProgress } from "@/features/task/utils/task-progress.util";
import { useState } from "react";

export function ProjectListPage() {
  const { projects, openProjectCreateDialog } = useProjects();
  const [tasks] = useState(readTasks);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8">
      <header className="space-y-2">
        <h1 className="m-0 text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Keep an eye on every project and its progress.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            progress={calculateProjectTaskProgress(tasks, project.id)}
          />
        ))}
        <ProjectCreateCard
          onOpenCreateProjectDialog={openProjectCreateDialog}
        />
      </div>
    </section>
  );
}
