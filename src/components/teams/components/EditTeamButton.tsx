import { useRef, useState } from "react";

import EditTeamForm from "./EditTeamForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { EditTeam, Team } from "../../../types/team.type";

type Props = {
  team: Team;
  editTeam: (teamId: string, newEditedTeam: EditTeam) => void;
  isEditLoading: boolean;
};

export default function EditTeamButton({
  team,
  editTeam,
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
        <EditTeamForm
          team={team}
          editTeam={editTeam}
          isEditLoading={isEditLoading}
        />
      )}
    </div>
  );
}
