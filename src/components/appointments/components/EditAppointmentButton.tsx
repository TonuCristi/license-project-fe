import { useRef, useState } from "react";

import Button from "../../Button";
import EditAppointmentForm from "./EditAppointmentForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Appointment } from "../../../types/appointment.type";

type Props = {
  appointment: Appointment;
};

export default function EditAppointmentButton({ appointment }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Edit</Button>

      {isOpen && <EditAppointmentForm appointment={appointment} />}
    </div>
  );
}
