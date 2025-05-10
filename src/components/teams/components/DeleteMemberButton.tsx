import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteMember } from "../hooks/useDeleteMember";

type Props = {
  memberId: string;
  employeeId: string;
};

export default function DeleteMemberButton({ memberId, employeeId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteMember, isLoading } = useDeleteMember();

  return (
    <>
      <Button variant="reject" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteMember(memberId, employeeId)}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this contact?
        </ConfirmationModal>
      )}
    </>
  );
}
