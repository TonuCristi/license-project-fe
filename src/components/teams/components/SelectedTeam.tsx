import { useContext } from "react";

import Button from "../../Button";
import SelectedTeamMembers from "./SelectedTeamMembers";
import DeleteTeamButton from "./DeleteTeamButton";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { twMerge } from "tailwind-merge";

export default function SelectedTeam() {
  const { selectedTeam, members, isMembersLoading } = useContext(TeamsContext);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={twMerge(
          "xs:grid-cols-2 sm::grid-cols-[40fr_20fr_20fr_20fr] grid grid-cols-1 items-center gap-2",
          isMembersLoading && "pointer-events-none",
        )}
      >
        <h2 className="font-medium">{selectedTeam?.name} team</h2>
        <DeleteTeamButton />
        <DeleteTeamButton />
        <Button size="full" disabled={!members.length} className="text-nowrap">
          Create meeting
        </Button>
      </div>
      <SelectedTeamMembers />
    </div>
  );
}
