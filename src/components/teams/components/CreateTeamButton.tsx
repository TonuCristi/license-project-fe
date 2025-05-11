import { useContext, useRef, useState } from "react";

import Button from "../../Button";
import CreateTeamForm from "./CreateTeamForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { TeamsContext } from "../../../contexts/TeamsContext";

export default function CreateTeamButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { isTeamsLoading } = useContext(TeamsContext);

  return (
    <div ref={containerRef} className="relative w-full">
      <Button
        size="full"
        disabled={isTeamsLoading}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Create team
      </Button>

      {isOpen && <CreateTeamForm />}
    </div>
  );
}
