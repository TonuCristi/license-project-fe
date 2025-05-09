import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateTeam, TeamResponse } from "../types/team.type";

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
};
