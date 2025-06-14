import { z } from "zod";

export const appointmentsFiltersSchema = z.object({
  state: z.string(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
});
