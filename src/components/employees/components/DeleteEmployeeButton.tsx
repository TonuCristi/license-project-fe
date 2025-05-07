import { useState } from "react";
import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

export default function DeleteEmployeeButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="reject" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      {isOpen && (
        <ConfirmationModal
          onAprove={() => console.log()}
          onReject={() => setIsOpen(false)}
          //   isLoading={isLoading}
        >
          Are you sure about deleting this contact?
        </ConfirmationModal>
      )}
    </>
  );
}
