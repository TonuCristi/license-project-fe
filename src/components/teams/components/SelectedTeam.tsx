import { useContext } from "react";

import SelectedTeamMembers from "./SelectedTeamMembers";
import DeleteTeamButton from "./DeleteTeamButton";
import EditTeamButton from "./EditTeamButton";
import CreateTeamMeetingButton from "./CreateTeamMeetingButton";

import { TeamsContext } from "../../../contexts/TeamsContext";

export default function SelectedTeam() {
  const { selectedTeam } = useContext(TeamsContext);

  return (
    <div className="flex flex-col gap-3">
      <div className="xs:grid-cols-2 sm::grid-cols-[40fr_20fr_20fr_20fr] grid grid-cols-1 items-center gap-2">
        <h2 className="font-medium">{selectedTeam?.name} team</h2>
        <EditTeamButton />
        <DeleteTeamButton />
        <CreateTeamMeetingButton />
      </div>
      <SelectedTeamMembers />
    </div>
  );
}
