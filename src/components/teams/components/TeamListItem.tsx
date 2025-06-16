import { Team } from "../../../types/team.type";
import DeleteTeamButton from "./DeleteTeamButton";
import EditTeamButton from "./EditTeamButton";

type Props = {
  team: Team;
};

export default function TeamListItem({ team }: Props) {
  return (
    <li className="border-primary flex items-center gap-2 rounded-xl border-2 p-2">
      <p className="font-medium">{team.name}</p>
      <div className="ml-auto">
        <DeleteTeamButton teamId={team.id} />
      </div>
      <EditTeamButton team={team} />
    </li>
  );
}
