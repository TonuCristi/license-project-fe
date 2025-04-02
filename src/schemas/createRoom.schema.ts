import { z } from "zod";

import { emailSchema } from "./email.schema";

export const createRoomSchema = z.object({ assistantEmail: emailSchema });
