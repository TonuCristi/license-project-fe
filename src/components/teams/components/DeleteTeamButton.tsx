import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteTeam } from "../hooks/useDeleteTeam";

type Props = {
  teamId: string;
};

export default function DeleteTeamButton({ teamId }: Props) {
  const { deleteTeam, isLoading } = useDeleteTeam();
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
          isLoading={isLoading}
        >
          Are you sure about deleting this employee?
        </ConfirmationModal>
      )}
    </>
  );
}
