import { z } from "zod";

import { usernameSchema } from "./username.schema";

export const changeUsernameSchema = z.object({ username: usernameSchema });
