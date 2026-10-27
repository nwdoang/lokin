import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/core/ui/dialog.ui";
import { ProjectCreateForm } from "@/features/project/components/project-create-form.component";
import type { ProjectCreateInput } from "@/features/project/types/project.type";

type ProjectCreateDialogProps = Readonly<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: ProjectCreateInput) => void;
}>;

export function ProjectCreateDialog({
  isOpen,
  onOpenChange,
  onSubmit,
}: ProjectCreateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Give your new project a name and short description.
          </DialogDescription>
        </DialogHeader>
        <ProjectCreateForm
          onCancel={() => onOpenChange(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
