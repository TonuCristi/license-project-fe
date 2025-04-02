import { z } from "zod";

import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { changeUsernameSchema } from "../schemas/changeUsername.schema";
import { changePasswordSchema } from "../schemas/changePasword.schema";

export type Login = z.infer<typeof loginSchema>;

export type Register = z.infer<typeof registerSchema>;

export type ChangeUsername = z.infer<typeof changeUsernameSchema>;

export type ChangePassword = z.infer<typeof changePasswordSchema>;

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  role: "chief" | "assistant" | "";
  room_id: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: "chief" | "assistant" | "";
  roomId: string;
};
