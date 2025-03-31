import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteAccount } from "../hooks/useDeleteAccount";

export default function DeleteAccountButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteAccount, isLoading } = useDeleteAccount();

  return (
    <div>
      <Button
        variant="reject"
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap"
      >
        Delete account
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={deleteAccount}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting your account?
        </ConfirmationModal>
      )}
    </div>
  );
}
