import { useRef, useState } from "react";

import CreateProjectMeetingForm from "./CreateProjectMeetingForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";

type Props = {
  projectId: string;
};

export default function CreateProjectMeetingButton({ projectId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Create meeting
      </Button>

      {isOpen && <CreateProjectMeetingForm projectId={projectId} />}
    </div>
  );
}
