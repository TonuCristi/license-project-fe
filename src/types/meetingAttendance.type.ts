import { z } from "zod";
import { checkPresenceFormSchema } from "../schemas/checkPresenceForm.schema";

export type CheckPresence = z.infer<typeof checkPresenceFormSchema>;

export type MeetingPresenceResponse = {
  fullName: string;
  email: string;
  attended: boolean;
};

export type MeetingPresence = {
  fullName: string;
  email: string;
  attended: boolean;
};
