import { useRef, useState } from "react";

import CreateAppointmentForm from "./CreateAppointmentForm";
import Button from "../../Button";
import { HiMiniPlusSmall } from "react-icons/hi2";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function CreateAppointmentButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-primary rounded-full"
      >
        <HiMiniPlusSmall className="stroke-1 text-2xl text-white" />
      </Button>

      {isOpen && <CreateAppointmentForm />}
    </div>
  );
}
