import { AxiosResponse } from "axios";

import { api } from "../config/api";
import { NotificationResponse } from "../types/notification.type";

const URL = "/api/notifications";

export const NotificationsApi = {
  getContacts() {
    return api
      .get(`${URL}/retrieve-notifications`)
      .then(
        ({ data }: AxiosResponse<{ notifications: NotificationResponse[] }>) =>
          data.notifications,
      );
  },
};
