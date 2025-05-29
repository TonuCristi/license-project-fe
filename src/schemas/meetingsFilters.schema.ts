import { z } from "zod";

export const meetingsFiltersSchema = z.object({
  meetingType: z.string(),
  year: z.string(),
  month: z.string(),
  day: z.string(),
});
