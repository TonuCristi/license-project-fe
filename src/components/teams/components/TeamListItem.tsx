import { Link } from "react-router";

import Button from "../../Button";

import { Team } from "../../../types/team.type";

type Props = {
  team: Team;
};

export default function TeamListItem({ team }: Props) {
  return (
    <li className="border-primary xxs:flex-row xxs:items-center flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <p className="font-medium">{team.name}</p>
      <Link to={`/teams/${team.id}`}>
        <Button>View team</Button>
      </Link>
    </li>
  );
}
