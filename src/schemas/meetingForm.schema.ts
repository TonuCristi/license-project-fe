import { z } from "zod";

export const meetingFormSchema = z.object({
  date: z.string().refine((val) => (val ? val + ":00Z" : false), {
    message: "Invalid date!",
  }),
  duration: z.string().min(1, "You should select the duration!"),
  note: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(200, {
      message: "The note should't be longer than 200 characters!",
    }),
});
