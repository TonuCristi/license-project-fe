import { z } from "zod";

export const contactsSearchBarSchema = z.object({
  contactName: z
    .string()
    .max(30, { message: "The name shouldn't have more than 30 characters!" }),
});
