import { z } from "zod";

export const appointmentsFiltersSchema = z.object({
  appointmentState: z.string(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
});
