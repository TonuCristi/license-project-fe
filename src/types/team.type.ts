import { z } from "zod";
import { teamFormSchema } from "../schemas/teamForm.schema";

export type CreateTeam = z.infer<typeof teamFormSchema>;

export type EditTeam = z.infer<typeof teamFormSchema>;

export type TeamResponse = {
  _id: string;
  name: string;
};

export type Team = {
  id: string;
  name: string;
};
