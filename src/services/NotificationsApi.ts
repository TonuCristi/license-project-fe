import { AxiosResponse } from "axios";

import { api } from "../config/api";
import { NotificationResponse } from "../types/notification.type";

const URL = "/api/notifications";

export const NotificationsApi = {
  getNotifications(
    offset: number,
    perPage: number,
    controller: AbortController,
  ) {
    return api
      .get(
        `${URL}/retrieve-notifications?offset=${offset}&perPage=${perPage}`,
        {
          signal: controller.signal,
        },
      )
      .then(
        ({ data }: AxiosResponse<{ notifications: NotificationResponse[] }>) =>
          data.notifications,
      );
  },
  getNotificationsCount() {
    return api
      .get(`${URL}/retrieve-notifications-count`)
      .then(({ data }: AxiosResponse<{ count: number }>) => data.count);
  },
  deleteNotification(notificationId: string) {
    return api
      .delete(`${URL}/delete-notification/${notificationId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
