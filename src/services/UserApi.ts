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
};
