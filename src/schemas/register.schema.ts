import { z } from "zod";

import { emailSchema } from "./email.schema";
import { passwordSchema } from "./password.schema";

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: z.string(),
});
