import { z } from "zod";

import { passwordSchema } from "./password.schema";

export const changePasswordSchema = z.object({
  newPassword: passwordSchema,
  newRepeatPassword: passwordSchema,
  oldPassword: passwordSchema,
});
