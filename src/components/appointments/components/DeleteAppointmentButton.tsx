import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";
import { HiMiniXMark } from "react-icons/hi2";

import { useDeleteAppointment } from "../hooks/useDeleteAppointment";

type Props = {
  appointmentId: string;
};

export default function DeleteAppointmentButton({ appointmentId }: Props) {
  const { deleteAppointment, isLoading } = useDeleteAppointment();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-auto"
      >
        <HiMiniXMark className="text-primary stroke-1 text-xl" />
      </Button>

      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteAppointment(appointmentId)}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this appointment?
        </ConfirmationModal>
      )}
    </>
  );
}
