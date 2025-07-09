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
    <li className="border-primary xs:flex-row xs:items-center flex flex-col gap-2 rounded-xl border-2 p-2">
      <p className="font-medium">{team.name}</p>
      <div className="xs:ml-auto flex flex-wrap items-center gap-2">
        <Link to={`/teams/${team.id}`}>
          <Button>View team</Button>
        </Link>
        <DeleteProjectTeamButton
          deleteProjectTeam={deleteProjectTeam}
          projectTeamId={team.projectTeamId}
          teamId={team.id}
          isDeleteLoading={isDeleteLoading}
        />
      </div>
    </li>
  );
}
