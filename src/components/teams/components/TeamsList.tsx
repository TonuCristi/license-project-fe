import { useContext } from "react";

import Button from "../../Button";

import { Team } from "../../../types/team.type";
import { TeamsContext } from "../../../contexts/TeamsContext";

type Props = {
  onTeamSelection: (team: Team) => void;
  isLoading?: boolean;
};

export default function TeamsList({
  onTeamSelection,
  isLoading = false,
}: Props) {
  const { teams } = useContext(TeamsContext);

  return (
    <ul className="border-primary scrollbar absolute top-full right-0 z-50 mt-1 flex max-h-64 w-full flex-col gap-2 overflow-y-auto rounded-xl border-2 bg-white p-2 transition-colors">
      {teams.map((team) => (
        <li key={team.id}>
          <Button
            variant="empty"
            disabled={isLoading}
            onClick={() => onTeamSelection(team)}
            className="w-full rounded-xl bg-blue-100 p-2 text-left hover:bg-blue-200"
          >
            {team.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
