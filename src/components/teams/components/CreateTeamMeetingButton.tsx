import { useContext, useRef, useState } from "react";

import CreateTeamMeetingForm from "./CreateTeamMeetingForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { TeamsContext } from "../../../contexts/TeamsContext";

export default function CreateTeamMeetingButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { isMembersLoading } = useContext(TeamsContext);

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        disabled={isMembersLoading}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Create meeting
      </Button>

      {isOpen && <CreateTeamMeetingForm />}
    </div>
  );
}
