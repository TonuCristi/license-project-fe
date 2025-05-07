import { z } from "zod";

export const searchBarSchema = z.object({
  value: z
    .string()
    .max(30, { message: "The name shouldn't have more than 30 characters!" }),
});
