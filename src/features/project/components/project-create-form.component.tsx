import { Button } from "@/core/ui/button";
import { Input } from "@/core/ui/input";
import { Textarea } from "@/core/ui/textarea.ui";
import type { ProjectCreateInput } from "@/features/project/types/project.type";
import { useId, useState, type SubmitEvent } from "react";

type ProjectCreateFormProps = Readonly<{
  onCancel: () => void;
  onSubmit: (input: ProjectCreateInput) => void;
}>;

export function ProjectCreateForm({
  onCancel,
  onSubmit,
}: ProjectCreateFormProps) {
  const formId = useId();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const nameInputId = `${formId}-project-name`;
  const descriptionInputId = `${formId}-project-description`;
  const errorId = `${formId}-project-name-error`;

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setValidationMessage("Project name is required.");
      return;
    }

    onSubmit({ name: trimmedName, description });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <label className="text-xs font-medium" htmlFor={nameInputId}>
          Project name
        </label>
        <Input
          id={nameInputId}
          aria-describedby={validationMessage ? errorId : undefined}
          aria-invalid={validationMessage.length > 0}
          autoFocus
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (validationMessage) {
              setValidationMessage("");
            }
          }}
        />
        {validationMessage ? (
          <p id={errorId} className="text-xs text-destructive">
            {validationMessage}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium" htmlFor={descriptionInputId}>
          Description
        </label>
        <Textarea
          id={descriptionInputId}
          placeholder="What is this project about?"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
