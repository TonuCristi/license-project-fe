import { useRef, useState } from "react";

import Button from "../../Button";
import EditAppointmentForm from "./EditAppointmentForm";
import { HiMiniPencil } from "react-icons/hi2";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Appointment, EditAppointment } from "../../../types/appointment.type";

type Props = {
  appointment: Appointment;
  editAppointment: (
    appointmentId: string,
    appointment: EditAppointment,
  ) => void;
  isLoading: boolean;
};

export default function EditAppointmentButton({
  appointment,
  editAppointment,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-auto"
      >
        <HiMiniPencil className="text-primary stroke-1 text-lg" />
      </Button>

      {isOpen && (
        <EditAppointmentForm
          appointment={appointment}
          editAppointment={editAppointment}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
