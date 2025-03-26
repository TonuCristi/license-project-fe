import { HiMiniInformationCircle } from "react-icons/hi2";

import { Appointment } from "../../../types/appointment.type";

type Props = {
  appointment: Appointment;
};

export default function AppointmentItem({ appointment }: Props) {
  const { attendee, attendeePhoneNumber, location, note } = appointment;

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
      {note.length && (
        <div className="group relative self-end">
          <HiMiniInformationCircle className="text-primary cursor-pointer text-xl" />
          <p className="border-primary scrollbar absolute right-0 bottom-full hidden h-28 w-44 overflow-hidden overflow-y-auto rounded-lg border-2 bg-white p-1 break-all group-hover:block">
            {note}
          </p>
        </div>
      )}
    </li>
  );
}
