import { useRef, useState } from "react";

import EditTeamForm from "./EditTeamForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Team } from "../../../types/team.type";

type Props = {
  team: Team;
};

export default function EditTeamButton({ team }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Edit</Button>

      {isOpen && <EditTeamForm team={team} />}
    </div>
  );
}
