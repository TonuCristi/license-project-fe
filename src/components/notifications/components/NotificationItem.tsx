import Button from "../../Button";
import { HiMiniXMark } from "react-icons/hi2";

import { Notification } from "../../../types/notification.type";

type Props = {
  notification: Notification;
};

export default function NotificationItem({ notification }: Props) {
  const { content } = notification;

  return (
    <li className="border-primary rounded-lg border-2 p-2">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 font-medium">
          <h3>Notification</h3>
          <span>-</span>
          <span>07:00</span>
        </div>
        <Button variant="empty">
          <HiMiniXMark className="text-primary stroke-1 text-xl" />
        </Button>
      </div>
      <p>{content}</p>
    </li>
  );
}
