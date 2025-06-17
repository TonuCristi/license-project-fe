import { Link } from "react-router";
import { Team } from "../../../types/team.type";

import DeleteProjectTeamButton from "./DeleteProjectTeamButton";
import Button from "../../Button";

type Props = {
  deleteProjectTeam: (projectTeamId: string, teamId: string) => void;
  team: Team;
  isDeleteLoading: boolean;
};

export default function ProjectTeamListItem({
  deleteProjectTeam,
  team,
  isDeleteLoading,
}: Props) {
  return (
    <li className="border-primary flex items-center gap-2 rounded-xl border-2 p-2">
      <p className="font-medium">{team.name}</p>
      <Link to={`/teams/${team.id}`} className="ml-auto">
        <Button>View team</Button>
      </Link>
      <DeleteProjectTeamButton
        deleteProjectTeam={deleteProjectTeam}
        projectTeamId={team.projectTeamId}
        teamId={team.id}
        isDeleteLoading={isDeleteLoading}
      />
    </li>
  );
}
