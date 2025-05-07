import { z } from "zod";
import { usernameSchema } from "./username.schema";

export const contactFormSchema = z.object({
  name: usernameSchema,
  phoneNumber: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(10, {
      message: "The phone number should't be longer than 10 characters!",
    }),
  description: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(60, {
      message: "The description should't be longer than 60 characters!",
    }),
});
