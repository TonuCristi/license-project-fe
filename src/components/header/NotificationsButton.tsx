import { useContext, useRef, useState } from "react";

import Button from "../Button";
import Notifications from "../notifications/components/Notifications";
import { HiMiniBell } from "react-icons/hi2";

import { useClickOutside } from "../../hooks/useClickOutside";
import { NotificationsContext } from "../../contexts/NotificationsContext";

export default function NotificationsButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const { notifications } = useContext(NotificationsContext);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <li ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-xl text-blue-200 transition-colors ease-initial hover:text-white"
      >
        <div className="relative">
          <HiMiniBell />
          {!!notifications.length && (
            <span className="absolute -top-2/5 min-w-4 rounded-full bg-red-500 px-1 py-0.5 text-xs font-medium text-white">
              {notifications.length}
            </span>
          )}
        </div>
      </Button>

      {isOpen && <Notifications />}
    </li>
  );
}
