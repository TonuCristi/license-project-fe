import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

type Props = {
  teamId: string;
  deleteTeam: (teamId: string) => void;
  isDeleteLoading: boolean;
};

export default function DeleteTeamButton({
  teamId,
  deleteTeam,
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
          onAprove={() => deleteTeam(teamId)}
          onReject={() => setIsOpen(false)}
          isLoading={isDeleteLoading}
        >
          Are you sure about deleting this team?
        </ConfirmationModal>
      )}
    </>
  );
}
