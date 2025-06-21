import { z } from "zod";
import { emailSchema } from "./email.schema";

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});
