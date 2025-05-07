import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";
import { HiMiniXMark } from "react-icons/hi2";

import { useDeleteContact } from "../hooks/useDeleteContact";

type Props = {
  contactId: string;
};

export default function DeleteContactButton({ contactId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteContact, isLoading } = useDeleteContact();

  return (
    <>
      <Button
        variant="empty"
        onClick={() => setIsOpen(true)}
        className="ml-auto"
      >
        <HiMiniXMark className="hover:text-primary stroke-1 text-lg transition-colors" />
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteContact(contactId)}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this contact?
        </ConfirmationModal>
      )}
    </>
  );
}
