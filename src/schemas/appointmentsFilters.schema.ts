import { z } from "zod";

export const appointmentsFiltersSchema = z.object({
  year: z.string(),
  month: z.string(),
  day: z.string(),
});
