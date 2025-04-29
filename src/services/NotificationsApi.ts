import { AxiosResponse } from "axios";

import { api } from "../config/api";
import { NotificationResponse } from "../types/notification.type";

const URL = "/api/notifications";

export const NotificationsApi = {
  getNotifications() {
    return api
      .get(`${URL}/retrieve-notifications`)
      .then(
        ({ data }: AxiosResponse<{ notifications: NotificationResponse[] }>) =>
          data.notifications,
      );
  },
  deleteNotification(notificationId: string) {
    return api
      .delete(`${URL}/delete-notification/${notificationId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
