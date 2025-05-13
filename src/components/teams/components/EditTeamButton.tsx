import { useRef, useState } from "react";

import Button from "../../Button";
import EditTeamForm from "./EditTeamForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function EditTeamButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button size="full" onClick={() => setIsOpen((prev) => !prev)}>
        Edit team
      </Button>

      {isOpen && <EditTeamForm />}
    </div>
  );
}
