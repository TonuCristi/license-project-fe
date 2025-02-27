import { z } from "zod";

export const contactsSearchBarSchema = z.object({
  contactName: z
    .string()
    .max(30, { message: "You can't enter that many characters!" }),
});
