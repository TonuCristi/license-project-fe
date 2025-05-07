import Button from "../../Button";
import { HiMiniXMark } from "react-icons/hi2";

import { Notification } from "../../../types/notification.type";
import { useDeleteNotification } from "../hooks/useDeleteNotification";

type Props = {
  notification: Notification;
};

export default function NotificationItem({ notification }: Props) {
  const { deleteNotification, isLoading } = useDeleteNotification();
  const { content, createdAt } = notification;

  return (
    <li className="border-primary rounded-lg border-2 p-2">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-0.5 font-medium sm:flex-row sm:items-center sm:gap-1">
          <h3>Notification</h3>
          <span className="hidden sm:block">-</span>
          <span>{new Date(createdAt).toLocaleString()}</span>
        </div>
        <Button
          variant="empty"
          disabled={isLoading}
          onClick={() => deleteNotification(notification.id)}
          className="self-start"
        >
          <HiMiniXMark className="text-primary stroke-1 text-xl" />
        </Button>
      </div>
      <p>{content}</p>
    </li>
  );
}
