import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateTeam, TeamResponse } from "../types/team.type";
import { EmployeeResponse } from "../types/employee.type";

const URL = "/api/teams";

export const TeamsApi = {
  createTeam(team: CreateTeam) {
    return api
      .post(`${URL}/create-team`, team)
      .then(
        ({ data }: AxiosResponse<{ newTeam: TeamResponse; message: string }>) =>
          data,
      );
  },
  getTeams() {
    return api
      .get(`${URL}/retrieve-teams`)
      .then(({ data }: AxiosResponse<{ teams: TeamResponse[] }>) => data.teams);
  },
  getTeamMembers(
    teamId: string,
    search: string,
    offset: string,
    perPage: string,
  ) {
    return api
      .get(
        `${URL}/retrieve-team-members/${teamId}?search=${search}&offset=${offset}&perPage=${perPage}`,
      )
      .then(
        ({
          data,
        }: AxiosResponse<{ members: EmployeeResponse[]; pages: number }>) =>
          data,
      );
  },
};
