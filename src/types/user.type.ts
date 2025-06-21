import { z } from "zod";

import { changeUsernameSchema } from "../schemas/changeUsername.schema";
import { changePasswordSchema } from "../schemas/changePasword.schema";
import { loginFormSchema } from "../schemas/loginForm.schema";
import { registerFormSchema } from "../schemas/registerForm.schema";
import { forgotPasswordFormSchema } from "../schemas/forgotPasswordForm.schema";

export type Login = z.infer<typeof loginFormSchema>;

export type Register = z.infer<typeof registerFormSchema>;

export type ChangeUsername = z.infer<typeof changeUsernameSchema>;

export type ChangePassword = z.infer<typeof changePasswordSchema>;

export type ForgotPassword = z.infer<typeof forgotPasswordFormSchema>;

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
