import { Button } from "@/core/ui/button";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/core/ui/popover";
import { SidebarGroupAction, SidebarInput } from "@/core/ui/sidebar";
import { PlusIcon } from "lucide-react";
import { SubmitEvent , useState } from "react";

export type ProjectCreateActionProps = Readonly<{
  onCreateProject: (name: string) => void;
}>;

export function ProjectCreateAction({
  onCreateProject,
}: ProjectCreateActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  function resetForm(): void {
    setProjectName("");
    setValidationMessage("");
  }

  function handleOpenChange(open: boolean): void {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedName = projectName.trim();

    if (trimmedName.length === 0) {
      setValidationMessage("Project name is required.");
      return;
    }

    onCreateProject(trimmedName);
    resetForm();
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <SidebarGroupAction aria-label="Create project" title="Create project">
          <PlusIcon />
        </SidebarGroupAction>
      </PopoverTrigger>
      <PopoverContent align="end" side="right">
        <PopoverHeader>
          <PopoverTitle>Create project</PopoverTitle>
          <PopoverDescription>
            Add a project to this browser.
          </PopoverDescription>
        </PopoverHeader>
        <form className="space-y-3" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1">
            <label className="text-xs font-medium" htmlFor="project-name">
              Project name
            </label>
            <SidebarInput
              id="project-name"
              aria-describedby={
                validationMessage ? "project-name-error" : undefined
              }
              aria-invalid={validationMessage.length > 0}
              autoFocus
              value={projectName}
              onChange={(event) => {
                setProjectName(event.target.value);
                if (validationMessage) {
                  setValidationMessage("");
                }
              }}
            />
            {validationMessage ? (
              <p id="project-name-error" className="text-xs text-destructive">
                {validationMessage}
              </p>
            ) : null}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
