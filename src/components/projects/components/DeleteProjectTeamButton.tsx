import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

type Props = {
  deleteProjectTeam: (projectTeamId: string, teamId: string) => void;
  projectTeamId: string;
  teamId: string;
  isDeleteLoading: boolean;
};

export default function DeleteProjectTeamButton({
  deleteProjectTeam,
  projectTeamId,
  teamId,
  isDeleteLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="reject" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteProjectTeam(projectTeamId, teamId)}
          onReject={() => setIsOpen(false)}
          isLoading={isDeleteLoading}
        >
          Are you sure about deleting this member?
        </ConfirmationModal>
      )}
    </>
  );
}
