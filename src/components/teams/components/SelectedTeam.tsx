import { useContext } from "react";

import Button from "../../Button";
import SelectedTeamMembers from "./SelectedTeamMembers";

import { TeamsContext } from "../../../contexts/TeamsContext";

export default function SelectedTeam() {
  const { selectedTeam, members } = useContext(TeamsContext);

  return (
    <div className="flex flex-col gap-3">
      <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
        <h2 className="font-medium">{selectedTeam?.name} team</h2>
        <Button size="full" disabled={!members.length}>
          Announce
        </Button>
      </div>
      <SelectedTeamMembers />
    </div>
  );
}
