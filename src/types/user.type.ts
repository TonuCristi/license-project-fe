import { z } from "zod";

import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { changeUsernameSchema } from "../schemas/changeUsername.schema";

export type Login = z.infer<typeof loginSchema>;

export type Register = z.infer<typeof registerSchema>;

export type ChangeUsername = z.infer<typeof changeUsernameSchema>;

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  role: "chief" | "assistant" | "";
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: "chief" | "assistant" | "";
};
