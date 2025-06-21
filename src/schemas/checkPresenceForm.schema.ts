import { z } from "zod";
import { emailSchema } from "./email.schema";

export const checkPresenceFormSchema = z.object({
  email: emailSchema,
});
