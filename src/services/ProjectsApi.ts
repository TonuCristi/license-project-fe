import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  CreateProject,
  EditProject,
  ProjectProgress,
  ProjectResponse,
  ProjectState,
} from "../types/project.type";

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
  getProject(projectId: string) {
    return api
      .get(`${URL}/retrieve-project/${projectId}`)
      .then(
        ({ data }: AxiosResponse<{ project: ProjectResponse }>) => data.project,
      );
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
  editProject(projectId: string, newEditedProject: EditProject) {
    return api.put(`${URL}/edit-project/${projectId}`, newEditedProject).then(
      ({
        data,
      }: AxiosResponse<{
        editedProject: ProjectResponse;
        message: string;
      }>) => data,
    );
  },
  editProjectProgress(projectId: string, progress: ProjectProgress) {
    return api
      .put(`${URL}/edit-project-progress/${projectId}`, { progress })
      .then(
        ({
          data,
        }: AxiosResponse<{
          editedProgress: ProjectProgress;
          message: string;
        }>) => data,
      );
  },
  editProjectState(projectId: string, state: ProjectState) {
    return api.put(`${URL}/edit-project-state/${projectId}`, { state }).then(
      ({
        data,
      }: AxiosResponse<{
        editedState: ProjectState;
        message: string;
      }>) => data,
    );
  },
};
