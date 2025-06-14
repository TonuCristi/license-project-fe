import { z } from "zod";

export const projectsFiltersSchema = z.object({
  search: z.string(),
  state: z.string(),
});
