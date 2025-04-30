import { useContext, useEffect } from "react";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { NotificationsApi } from "../../../services/NotificationsApi";
import { mapNotification } from "../../../utlis/mapNotification";

export function useFetchNotifications() {
  const { isLoading, setNotifications, setIsLoading } =
    useContext(NotificationsContext);

  useEffect(() => {
    NotificationsApi.getNotifications()
      .then((res) => {
        const notifications = res.map((notification) =>
          mapNotification(notification),
        );

        setNotifications(notifications);
      })
      .finally(() => setIsLoading(false));
  }, [setNotifications, setIsLoading]);

  return { isLoading };
}
