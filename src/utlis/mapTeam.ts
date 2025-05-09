import { TeamResponse } from "../types/team.type";

export function mapTeam(team: TeamResponse) {
  const { _id: id, ...rest } = team;

  return { id, ...rest };
}
