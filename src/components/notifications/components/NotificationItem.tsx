import Button from "../../Button";
import { HiMiniXMark } from "react-icons/hi2";

import { Notification } from "../../../types/notification.type";
import { formatDate } from "../../../utlis/formatDate";
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
        <div className="flex items-center gap-1 font-medium">
          <h3>Notification</h3>
          <span>-</span>
          <span>{formatDate(createdAt)}</span>
        </div>
        <Button
          variant="empty"
          disabled={isLoading}
          onClick={() => deleteNotification(notification.id)}
        >
          <HiMiniXMark className="text-primary stroke-1 text-xl" />
        </Button>
      </div>
      <p>{content}</p>
    </li>
  );
}
