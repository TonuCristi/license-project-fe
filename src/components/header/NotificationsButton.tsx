import { useContext, useState } from "react";

import Button from "../Button";
import Notifications from "../notifications/components/Notifications";
import Overlay from "../Overlay";
import NavbarItem from "./NavbarItem";
import { HiMiniBell, HiMiniXMark } from "react-icons/hi2";

import { NotificationsContext } from "../../contexts/NotificationsContext";

export default function NotificationsButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { notifications } = useContext(NotificationsContext);

  return (
    <div className="relative">
      <NavbarItem>
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

        {isOpen && (
          <Overlay>
            <Button
              variant="empty"
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5"
            >
              <HiMiniXMark className="text-primary stroke-1 text-xl" />
            </Button>
            <div className="h-3/4 w-full p-4 sm:w-md">
              <Notifications />
            </div>
          </Overlay>
        )}
      </NavbarItem>
    </div>
  );
}
