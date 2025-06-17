import { TeamResponse } from "../types/team.type";

export function mapTeam(team: TeamResponse) {
  const { _id: id, projectTeam_id: projectTeamId, ...rest } = team;

  return { id, projectTeamId, ...rest };
}
