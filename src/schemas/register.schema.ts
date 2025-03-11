import { z } from "zod";

import { emailSchema } from "./email.schema";
import { passwordSchema } from "./password.schema";

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(30, { message: "The name should't be longer than 30 characters!" }),
  email: emailSchema,
  password: passwordSchema,
  role: z
    .string()
    .refine((role) => role === "chief" || role === "assistant", {
      message: "You should chose a valid role!",
    }),
});
