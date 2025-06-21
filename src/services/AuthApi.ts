import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { ChangePassword, Login, Register } from "../types/user.type";

const URL = "/api/auth";

export const AuthApi = {
  login(credentials: Login) {
    return api
      .post(`${URL}/login`, credentials)
      .then(({ data }: AxiosResponse<{ token: string }>) => data.token);
  },
  register(credentials: Register) {
    return api
      .post(`${URL}/register`, credentials)
      .then(({ data }: AxiosResponse<{ token: string }>) => data.token);
  },
  forgotPassword(email: string) {
    return api
      .post(`${URL}/forgot-password`, { email })
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  resetPassword(token: string, passwords: ChangePassword) {
    return api
      .post(`${URL}/reset-password?token=${token}`, passwords)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
