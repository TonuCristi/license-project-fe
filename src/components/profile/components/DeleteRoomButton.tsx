import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteRoom } from "../hooks/useDeleteRoom";

export default function DeleteRoomButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteRoom, isLoading } = useDeleteRoom();

  return (
    <div>
      <Button
        variant="reject"
        onClick={() => setIsOpen(true)}
        className="whitespace-nowrap"
      >
        Delete room
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={deleteRoom}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this room?
        </ConfirmationModal>
      )}
    </div>
  );
}
