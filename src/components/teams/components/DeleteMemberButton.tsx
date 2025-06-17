import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

type Props = {
  deleteMember: (membershipId: string, employeeId: string) => void;
  membershipId: string;
  memberId: string;
  isDeleteLoading: boolean;
};

export default function DeleteMemberButton({
  deleteMember,
  membershipId,
  memberId,
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
          onAprove={() => deleteMember(membershipId, memberId)}
          onReject={() => setIsOpen(false)}
          isLoading={isDeleteLoading}
        >
          Are you sure about deleting this member?
        </ConfirmationModal>
      )}
    </>
  );
}
