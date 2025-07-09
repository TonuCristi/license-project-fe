import { useRef, useState } from "react";

import Button from "../../Button";
import EditMeetingForm from "./EditMeetingForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { EditMeeting, Meeting } from "../../../types/meeting.type";

type Props = {
  editMeeting: (meetingId: string, newEditedMeeting: EditMeeting) => void;
  meeting: Meeting;
  isEditLoading: boolean;
};

export default function EditMeetingButton({
  editMeeting,
  meeting,
  isEditLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button size="full" onClick={() => setIsOpen((prev) => !prev)}>
        Edit
      </Button>

      {isOpen && (
        <EditMeetingForm
          meeting={meeting}
          editMeeting={editMeeting}
          isEditLoading={isEditLoading}
        />
      )}
    </div>
  );
}
