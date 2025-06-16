import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateTeam, EditTeam, TeamResponse } from "../types/team.type";
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
  getTeams(
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) {
    return api
      .get(
        `${URL}/retrieve-teams?search=${encodeURIComponent(search)}&offset=${offset}&perPage=${perPage}`,
        {
          signal: controller.signal,
        },
      )
      .then(
        ({ data }: AxiosResponse<{ teams: TeamResponse[]; pages: number }>) =>
          data,
      );
  },
  getTeam(teamId: string) {
    return api
      .get(`${URL}/retrieve-team/${teamId}`)
      .then(({ data }: AxiosResponse<{ team: TeamResponse }>) => data.team);
  },
  getTeamsPages(search: string, perPage: number) {
    return api
      .get(`${URL}/retrieve-teams-pages?search=${search}&perPage=${perPage}`)
      .then(({ data }: AxiosResponse<{ pages: number }>) => data.pages);
  },
  getTeamMembers(
    teamId: string,
    search: string,
    offset: number,
    perPage: number,
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
  deleteMember(memberId: string) {
    return api
      .delete(`${URL}/delete-member/${memberId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  deleteTeam(teamId: string) {
    return api
      .delete(`${URL}/delete-team/${teamId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editTeam(teamId: string, newEditedTeam: EditTeam) {
    return api
      .put(`${URL}/edit-team/${teamId}`, newEditedTeam)
      .then(
        ({
          data,
        }: AxiosResponse<{ editedTeam: TeamResponse; message: string }>) =>
          data,
      );
  },
  addToTeam(teamId: string, employeesIds: string[]) {
    return api
      .post(`${URL}/add-to-team/${teamId}`, { employeesIds })
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
