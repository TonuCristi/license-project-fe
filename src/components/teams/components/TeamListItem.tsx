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
        className="border-primary block rounded-xl border-2 p-2 font-medium transition-colors hover:bg-blue-200"
      >
        {team.name}
      </Link>
    </li>
  );
}
