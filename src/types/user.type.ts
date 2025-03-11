import { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export type Login = z.infer<typeof loginSchema>;

export type Register = z.infer<typeof registerSchema>;
