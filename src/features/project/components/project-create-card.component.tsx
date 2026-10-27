import { PlusIcon } from "lucide-react";

type ProjectCreateCardProps = Readonly<{
  onOpenCreateProjectDialog: () => void;
}>;

export function ProjectCreateCard({
  onOpenCreateProjectDialog,
}: ProjectCreateCardProps) {
  return (
    <button
      aria-label="Create a new project"
      className="group flex min-h-64 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-card/40 p-6 text-center text-muted-foreground shadow-sm outline-none transition-[transform,box-shadow,border-color,color] duration-200 hover:-translate-y-1 hover:border-primary/40 hover:text-foreground hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      type="button"
      onClick={onOpenCreateProjectDialog}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none">
        <PlusIcon className="size-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-medium text-foreground">
          Create new project
        </span>
        <span className="mt-1 block text-sm">
          Add another space for your tasks
        </span>
      </span>
    </button>
  );
}
