import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteTeam } from "../hooks/useDeleteTeam";

export default function DeleteTeamButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteTeam, isLoading } = useDeleteTeam();

  return (
    <>
      <Button
        variant="reject"
        size="full"
        onClick={() => setIsOpen(true)}
        className="text-nowrap"
      >
        Delete team
      </Button>
      {isOpen && (
        <ConfirmationModal
          onAprove={deleteTeam}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this team?
        </ConfirmationModal>
      )}
    </>
  );
}
