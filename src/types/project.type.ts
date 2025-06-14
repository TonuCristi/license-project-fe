import { z } from "zod";
import { projectsFiltersSchema } from "../schemas/projectsFilters.schema";

export type ProjectFilters = z.infer<typeof projectsFiltersSchema>;

export type ProjectResponse = {
  _id: string;
  name: string;
  description: string;
  start_date: string;
  deadline: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  deadline: string;
};
