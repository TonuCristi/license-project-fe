import { AxiosResponse } from "axios";

import { api } from "../config/api";
import { UserResponse } from "../types/user.type";

const URL = "/api/users";

export const UserApi = {
  getLoggedUser() {
    return api
      .get(`${URL}/retrieve-logged-user`)
      .then(({ data }: AxiosResponse<{ user: UserResponse }>) => data.user);
  },
  deleteAccount() {
    return api
      .delete(`${URL}/delete-account`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  changeUsername(username: string) {
    return api
      .put(`${URL}/change-username`, { username })
      .then(
        ({ data }: AxiosResponse<{ newUsername: string; message: string }>) =>
          data,
      );
  },
};
