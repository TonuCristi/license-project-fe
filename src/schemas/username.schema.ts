import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(1, { message: "This field should't be empty!" })
  .max(30, { message: "The name should't be longer than 30 characters!" });
