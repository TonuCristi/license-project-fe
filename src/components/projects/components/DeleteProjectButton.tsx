import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

type Props = {
  projectId: string;
  deleteProject: (projectId: string) => void;
  isDeleteLoading: boolean;
};

export default function DeleteProjectButton({
  projectId,
  deleteProject,
  isDeleteLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="reject" size="full" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteProject(projectId)}
          onReject={() => setIsOpen(false)}
          isLoading={isDeleteLoading}
        >
          Are you sure about deleting this project?
        </ConfirmationModal>
      )}
    </>
  );
}
