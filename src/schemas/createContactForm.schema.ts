import { z } from "zod";

export const createContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(30, { message: "The name should't be longer than 30 characters!" }),
  phoneNumber: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(10, {
      message: "The phone number should't be longer than 10 characters!",
    }),
  description: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(70, {
      message: "The description should't be longer than 70 characters!",
    }),
});
