import { useContext } from "react";

import Button from "../../Button";

import { TeamsContext } from "../../../contexts/TeamsContext";

export default function TeamsList() {
  const { teams, setSelectedTeam } = useContext(TeamsContext);

  return (
    <ul className="border-primary scrollbar absolute top-full right-0 z-50 mt-1 flex h-64 w-full flex-col gap-2 overflow-y-auto rounded-xl border-2 bg-white p-2 transition-colors">
      {teams.map((team) => (
        <li key={team.id}>
          <Button
            variant="empty"
            onClick={() => setSelectedTeam(team)}
            className="w-full rounded-xl bg-blue-100 p-2 text-left hover:bg-blue-200"
          >
            {team.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
