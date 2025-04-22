import { useRef, useState } from "react";

import Button from "../Button";
import Notifications from "../notifications/components/Notifications";
import { HiMiniBell } from "react-icons/hi2";

import { useClickOutside } from "../../hooks/useClickOutside";

export default function NotificationsButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <li ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-xl text-blue-200 transition-colors ease-initial hover:text-white"
      >
        <HiMiniBell />
      </Button>

      {isOpen && <Notifications />}
    </li>
  );
}
