import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "This field should't be empty!" })
  .email({ message: "Invalid email address!" });
