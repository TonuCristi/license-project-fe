import { ProjectResponse } from "../types/project.type";

export function mapProject(project: ProjectResponse) {
  const { _id: id, start_date: startDate, ...rest } = project;

  return { id, startDate, ...rest };
}
