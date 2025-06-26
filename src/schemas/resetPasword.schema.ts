import { z } from "zod";

import { passwordSchema } from "./password.schema";

export const resetPasswordSchema = z.object({
  newPassword: passwordSchema,
  newRepeatPassword: passwordSchema,
});
