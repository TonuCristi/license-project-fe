import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteMeeting } from "../hooks/useDeleteMeeting";

type Props = {
  meetingId: string;
};

export default function DeleteMeetingButton({ meetingId }: Props) {
  const { deleteMeeting, isLoading } = useDeleteMeeting();
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
          isLoading={isLoading}
        >
          Are you sure about deleting this meeting?
        </ConfirmationModal>
      )}
    </>
  );
}
