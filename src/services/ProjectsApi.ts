import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { ProjectResponse } from "../types/project.type";

const URL = "/api/projects";

export const ProjectsApi = {
  getProjects(search: string, state: string, offset: number, perPage: number) {
    return api
      .get(
        `${URL}/retrieve-projects?search=${search}&state=${state}&offset=${offset}&perPage=${perPage}`,
      )
      .then(
        ({
          data,
        }: AxiosResponse<{ projects: ProjectResponse[]; pages: number }>) =>
          data,
      );
  },
};
