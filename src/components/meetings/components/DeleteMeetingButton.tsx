import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteTeamMeeting } from "../hooks/useDeleteTeamMeeting";

type Props = {
  meetingId: string;
};

export default function DeleteMeetingButton({ meetingId }: Props) {
  const { deleteTeamMeeting, isLoading } = useDeleteTeamMeeting();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="reject" onClick={() => setIsOpen(true)}>
        Delete
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteTeamMeeting(meetingId)}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this meeting?
        </ConfirmationModal>
      )}
    </>
  );
}
