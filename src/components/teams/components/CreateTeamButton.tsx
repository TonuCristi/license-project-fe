import { useRef, useState } from "react";

import Button from "../../Button";
import CreateTeamForm from "./CreateTeamForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function CreateTeamButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative w-full">
      <Button
        size="full"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Create team
      </Button>

      {isOpen && <CreateTeamForm />}
    </div>
  );
}
