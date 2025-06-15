import { z } from "zod";
import { projectsFiltersSchema } from "../schemas/projectsFilters.schema";
import { projectFormSchema } from "../schemas/projectForm.schema";

export type CreateProject = z.infer<typeof projectFormSchema>;

export type EditProject = z.infer<typeof projectFormSchema>;

export type ProjectFilters = z.infer<typeof projectsFiltersSchema>;

export type ProjectState = "pending" | "progress" | "finished";

export type ProjectProgress =
  | 0
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 100;

export type ProjectResponse = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  deadline: string;
  state: ProjectState;
  progress: ProjectProgress;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  deadline: string;
  state: ProjectState;
  progress: ProjectProgress;
};
