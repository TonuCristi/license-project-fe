import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { Login } from "../types/user.type";

const URL = "/api/auth";

export const AuthApi = {
  login(credentials: Login) {
    return api
      .post(`${URL}/login`, credentials)
      .then(({ data }: AxiosResponse<{ token: string }>) => data.token);
  },
};
