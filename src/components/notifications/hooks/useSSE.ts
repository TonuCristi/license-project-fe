import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { UserContext } from "../../../contexts/UserContext";
import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { mapNotification } from "../../../utlis/mapNotification";

export function useSSE() {
  const { user } = useContext(UserContext);
  const { setNotifications } = useContext(NotificationsContext);

  useEffect(() => {
    if (!user) return;

    const sse = new EventSource(
      `http://localhost:8000/api/events?token=${localStorage.getItem("token")}`,
    );

    sse.addEventListener("message", ({ data }) => {
      const notification = mapNotification(JSON.parse(data));

      setNotifications((prev) => [notification, ...prev]);

      toast.success(notification.content);
    });
  }, [user, setNotifications]);
}
