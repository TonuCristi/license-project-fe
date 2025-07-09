import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

type Props = {
  deleteMeeting: (meetingId: string) => void;
  meetingId: string;
  isDeleteLoading: boolean;
};

export default function DeleteMeetingButton({
  deleteMeeting,
  meetingId,
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
          onAprove={() => deleteMeeting(meetingId)}
          onReject={() => setIsOpen(false)}
          isLoading={isDeleteLoading}
        >
          Are you sure about deleting this meeting?
        </ConfirmationModal>
      )}
    </>
  );
}
