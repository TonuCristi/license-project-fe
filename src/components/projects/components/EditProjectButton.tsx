import { useRef, useState } from "react";

import EditProjectForm from "./EditProjectForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { EditProject, Project } from "../../../types/project.type";

type Props = {
  project: Project;
  editProject: (projectId: string, newEditedProject: EditProject) => void;
  isEditLoading: boolean;
};

export default function EditProjectButton({
  project,
  editProject,
  isEditLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Edit</Button>

      {isOpen && (
        <EditProjectForm
          project={project}
          editProject={editProject}
          isEditLoading={isEditLoading}
        />
      )}
    </div>
  );
}
