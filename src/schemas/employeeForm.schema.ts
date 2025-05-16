import { z } from "zod";
import { usernameSchema } from "./username.schema";
import { emailSchema } from "./email.schema";

export const employeeFormSchema = z.object({
  fullName: usernameSchema,
  email: emailSchema,
  hireDate: z.string().refine(
    (val) => {
      return val ? val + ":00Z" : false;
    },
    {
      message: "Invalid date!",
    },
  ),
  phoneNumber: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(10, {
      message: "The phone number should't be longer than 10 characters!",
    }),
});
