import { Link } from "react-router";
import { Team } from "../../../types/team.type";

type Props = {
  team: Team;
};

export default function TeamListItem({ team }: Props) {
  return (
    <li>
      <Link
        to={`/teams/${team.id}`}
        className="border-primary flex items-center gap-2 rounded-xl border-2 p-2"
      >
        <p className="font-medium">{team.name}</p>
      </Link>
    </li>
  );
}
