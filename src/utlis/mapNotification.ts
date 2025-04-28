import { NotificationResponse } from "../types/notification.type";

export function mapNotification(notification: NotificationResponse) {
  const { _id: id, ...rest } = notification;
  return { id, ...rest };
}
