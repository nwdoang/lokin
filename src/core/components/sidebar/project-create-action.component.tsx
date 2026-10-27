import { SidebarGroupAction } from "@/core/ui/sidebar";
import { PlusIcon } from "lucide-react";

export type ProjectCreateActionProps = Readonly<{
  onOpenCreateProjectDialog: () => void;
}>;

export function ProjectCreateAction({
  onOpenCreateProjectDialog,
}: ProjectCreateActionProps) {
  return (
    <SidebarGroupAction
      aria-label="Create project"
      title="Create project"
      onClick={onOpenCreateProjectDialog}
    >
      <PlusIcon />
    </SidebarGroupAction>
  );
}
