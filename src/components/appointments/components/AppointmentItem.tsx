import { useState } from "react";

import { HiMiniInformationCircle, HiMiniXMark } from "react-icons/hi2";
import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";
import EditAppointmentButton from "./EditAppointmentButton";

import { Appointment, EditAppointment } from "../../../types/appointment.type";

type Props = {
  appointment: Appointment;
  deleteAppointment: (appointmentId: string) => void;
  editAppointment: (
    appointmentId: string,
    appointment: EditAppointment,
  ) => void;
  isLoading: boolean;
};

export default function AppointmentItem({
  appointment,
  deleteAppointment,
  editAppointment,
  isLoading,
}: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { id, attendee, attendeePhoneNumber, location, note } = appointment;

  const timeZoneOffset =
    new Date(appointment.startTime).getTimezoneOffset() / 60;

  const startTime = new Date(
    new Date(appointment.startTime).setHours(
      new Date(appointment.startTime).getHours() + timeZoneOffset,
    ),
  ).toLocaleString();

  const endTime = new Date(
    new Date(appointment.endTime).setHours(
      new Date(appointment.endTime).getHours() + timeZoneOffset,
    ),
  ).toLocaleString();

  return (
    <li className="border-primary flex rounded-lg border-2 p-2">
      <div className="flex w-full flex-col gap-2">
        <p>
          <span className="font-medium">Attendee:</span> {attendee}
        </p>
        <p>
          <span className="font-medium">Phone number:</span>{" "}
          {attendeePhoneNumber}
        </p>
        <p>
          <span className="font-medium">Location:</span> {location}
        </p>
        <p>
          <span className="font-medium">Start time:</span> {startTime}
        </p>
        <p>
          <span className="font-medium">End time:</span> {endTime}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button
          variant="empty"
          onClick={() => setIsDeleteModalOpen((prev) => !prev)}
          className="mt-auto"
        >
          <HiMiniXMark className="text-primary stroke-1 text-xl" />
        </Button>

        <EditAppointmentButton
          appointment={appointment}
          editAppointment={editAppointment}
          isLoading={isLoading}
        />

        {note.length && (
          <div className="group relative self-end">
            <HiMiniInformationCircle className="text-primary cursor-pointer text-xl" />
            <p className="border-primary scrollbar absolute right-0 bottom-full hidden h-28 w-44 overflow-hidden overflow-y-auto rounded-lg border-2 bg-white p-1 break-all group-hover:block">
              {note}
            </p>
          </div>
        )}

        {isDeleteModalOpen && (
          <ConfirmationModal
            onAprove={() => deleteAppointment(id)}
            onReject={() => setIsDeleteModalOpen(false)}
            isLoading={isLoading}
          >
            Are you sure about deleting this appointment?
          </ConfirmationModal>
        )}
      </div>
    </li>
  );
}
