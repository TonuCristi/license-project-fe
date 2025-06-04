import DeleteAppointmentButton from "./DeleteAppointmentButton";
import EditAppointmentButton from "./EditAppointmentButton";
import { HiMiniInformationCircle } from "react-icons/hi2";

import { Appointment } from "../../../types/appointment.type";
import { formatDate } from "../../../utlis/formatDate";
import { useFormContext } from "react-hook-form";

type Props = {
  appointment: Appointment;
};

export default function AppointmentListItem({ appointment }: Props) {
  const { id, attendee, attendeePhoneNumber, location, note } = appointment;
  const { watch } = useFormContext();

  const startTime = formatDate(appointment.startTime);
  const endTime = formatDate(appointment.endTime);

  return (
    <li className="border-primary xs:flex-row flex flex-col gap-2 rounded-lg border-2 p-2">
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
      <div className="xs:items-center xs:flex-col flex flex-row justify-between gap-2">
        <div className="flex items-center gap-2">
          <DeleteAppointmentButton appointmentId={id} />
          {watch("appointmentState") === "finished" ||
            watch("appointmentState") === "progress" || (
              <EditAppointmentButton appointment={appointment} />
            )}
        </div>

        {note.length && (
          <div className="group relative self-end">
            <HiMiniInformationCircle className="text-primary cursor-pointer text-xl" />
            <p className="border-primary scrollbar absolute right-0 bottom-full hidden h-28 w-44 overflow-hidden overflow-y-auto rounded-lg border-2 bg-white p-1 break-all group-hover:block">
              {note}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}
