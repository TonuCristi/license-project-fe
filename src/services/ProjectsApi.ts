import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { CreateProject, ProjectResponse } from "../types/project.type";

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
  getProjectsPages(search: string, state: string, perPage: number) {
    return api
      .get(
        `${URL}/retrieve-projects-pages?search=${search}&state=${state}&perPage=${perPage}`,
      )
      .then(({ data }: AxiosResponse<{ pages: number }>) => data.pages);
  },
  createProject(project: CreateProject) {
    return api
      .post(`${URL}/create-project`, project)
      .then(
        ({
          data,
        }: AxiosResponse<{ newProject: ProjectResponse; message: string }>) =>
          data,
      );
  },
};
