import { useContext } from "react";

import NotificationItem from "./NotificationItem";

import { NotificationsContext } from "../../../contexts/NotificationsContext";

export default function Notifications() {
  const { notifications } = useContext(NotificationsContext);

  return (
    <div className="border-primary absolute flex h-80 w-80 flex-col gap-2 rounded-lg border-2 bg-blue-50 p-3">
      <h2 className="text-lg font-medium">Notifications</h2>
      <ul className="scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-2">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
}
