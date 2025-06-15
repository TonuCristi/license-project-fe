import { z } from "zod";

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(30, { message: "The name should't be longer than 30 characters!" }),
  description: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(500, {
      message: "The note should't be longer than 500 characters!",
    }),
  startDate: z.string().refine(
    (val) => {
      return val ? val + ":00Z" : false;
    },
    {
      message: "Invalid date!",
    },
  ),
  deadline: z.string().refine(
    (val) => {
      return val ? val + ":00Z" : false;
    },
    {
      message: "Invalid date!",
    },
  ),
});
