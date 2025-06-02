import { useContext, useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteTeam } from "../hooks/useDeleteTeam";
import { TeamsContext } from "../../../contexts/TeamsContext";

export default function DeleteTeamButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteTeam, isLoading } = useDeleteTeam();
  const { isMembersLoading } = useContext(TeamsContext);

  return (
    <>
      <Button
        variant="reject"
        size="full"
        disabled={isMembersLoading}
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
