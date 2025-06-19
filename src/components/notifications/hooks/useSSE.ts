import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { mapNotification } from "../../../utlis/mapNotification";
import { AuthContext } from "../../../contexts/AuthContext";

export function useSSE() {
  const { isLogged } = useContext(AuthContext);
  const { setNotificationsCount } = useContext(NotificationsContext);

  useEffect(() => {
    if (!isLogged) return;

    const sse = new EventSource(
      `http://localhost:8000/api/events?token=${localStorage.getItem("token")}`,
    );

    sse.addEventListener("message", ({ data }) => {
      const notification = mapNotification(JSON.parse(data));

      setNotificationsCount((prev) => prev + 1);

      toast.success(notification.content);
    });
  }, [isLogged, setNotificationsCount]);
}
