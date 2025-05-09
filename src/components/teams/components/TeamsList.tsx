import { Dispatch, SetStateAction, useContext } from "react";

import Button from "../../Button";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { Team } from "../../../types/team.type";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function TeamsList({ setIsOpen }: Props) {
  const { teams, setSelectedTeam } = useContext(TeamsContext);

  function handeleTeamSelection(team: Team) {
    setSelectedTeam(team);
    setIsOpen(false);
  }

  return (
    <ul className="border-primary scrollbar absolute top-full right-0 z-50 mt-1 flex h-64 w-full flex-col gap-2 overflow-y-auto rounded-xl border-2 bg-white p-2 transition-colors">
      {teams.map((team) => (
        <li key={team.id}>
          <Button
            variant="empty"
            onClick={() => handeleTeamSelection(team)}
            className="w-full rounded-xl bg-blue-100 p-2 text-left hover:bg-blue-200"
          >
            {team.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
