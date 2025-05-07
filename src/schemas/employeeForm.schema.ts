import { z } from "zod";
import { usernameSchema } from "./username.schema";
import { emailSchema } from "./email.schema";

export const employeeFormSchema = z.object({
  fullName: usernameSchema,
  email: emailSchema,
});
