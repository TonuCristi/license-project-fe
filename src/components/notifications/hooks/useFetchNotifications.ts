import { useContext } from "react";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { NotificationsApi } from "../../../services/NotificationsApi";
import { mapNotification } from "../../../utlis/mapNotification";

export function useFetchNotifications() {
  const { setNotifications, setIsLoading } = useContext(NotificationsContext);

  function getNotifications(
    offset: number,
    perPage: number,
    controller: AbortController,
  ) {
    NotificationsApi.getNotifications(offset, perPage, controller)
      .then((res) => {
        const notifications = res.map((notification) =>
          mapNotification(notification),
        );

        setNotifications((prev) => [...prev, ...notifications]);
      })
      .catch((error) => {
        if (error.name === "CanceledError") {
          return;
        }

        console.log(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }

  return { getNotifications };
}
