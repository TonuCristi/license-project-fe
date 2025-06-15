import { ProjectResponse } from "../types/project.type";

export function mapProject(project: ProjectResponse) {
  const { _id: id, ...rest } = project;

  return { id, ...rest };
}
