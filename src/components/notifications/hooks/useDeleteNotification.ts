import { useContext, useState } from "react";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { NotificationsApi } from "../../../services/NotificationsApi";

export function useDeleteNotification() {
  const { setNotifications } = useContext(NotificationsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteNotification(notificationId: string) {
    setIsLoading(true);
    NotificationsApi.deleteNotification(notificationId)
      .then(() => {
        setNotifications((prev) => [
          ...prev.filter((notification) => notification.id !== notificationId),
        ]);
      })
      .finally(() => setIsLoading(false));
  }

  return { deleteNotification, isLoading };
}
