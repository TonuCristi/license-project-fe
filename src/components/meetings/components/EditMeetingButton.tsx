import { useRef, useState } from "react";

import Button from "../../Button";
import EditMeetingForm from "./EditMeetingForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Meeting } from "../../../types/meeting.type";

type Props = {
  meeting: Meeting;
};

export default function EditMeetingButton({ meeting }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Edit</Button>

      {isOpen && <EditMeetingForm meeting={meeting} />}
    </div>
  );
}
