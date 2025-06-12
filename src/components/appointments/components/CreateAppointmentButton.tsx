import { useContext, useRef, useState } from "react";

import CreateAppointmentForm from "./CreateAppointmentForm";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

export default function CreateAppointmentButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { isLoading } = useContext(AppointmentsContext);

  return (
    <div ref={containerRef} className="relative">
      <Button
        disabled={isLoading}
        size="full"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Create appointment
      </Button>

      {isOpen && <CreateAppointmentForm />}
    </div>
  );
}
