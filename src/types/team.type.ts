import { z } from "zod";
import { teamFormSchema } from "../schemas/teamForm.schema";

export type CreateTeam = z.infer<typeof teamFormSchema>;
