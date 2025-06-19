import { z } from "zod";

import { emailSchema } from "./email.schema";
import { passwordSchema } from "./password.schema";
import { usernameSchema } from "./username.schema";

export const registerFormSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: z.string().refine((role) => role === "chief" || role === "assistant", {
    message: "You should chose a valid role!",
  }),
});
