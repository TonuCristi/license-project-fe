import { z } from "zod";
import { emailSchema } from "./email.schema";

export const teamFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(30, { message: "The name should't be longer than 30 characters!" }),
  leaderEmail: emailSchema,
});
