import { Appointment } from "../../../types/appointment.type";

type Props = {
  appointment: Appointment;
};

export default function AppointmentItem({ appointment }: Props) {
  const { attendee, attendeePhoneNumber, startTime, endTime, location, note } =
    appointment;

  return (
    <li className="border-primary flex flex-col gap-2 rounded-lg border-2 p-2">
      <p>
        <span className="font-medium">Attendee:</span> {attendee}
      </p>
      <p>
        <span className="font-medium">Phone number:</span> {attendeePhoneNumber}
      </p>
      <p>
        <span className="font-medium">Location:</span> {location}
      </p>
      <p>
        <span className="font-medium">Start time:</span>{" "}
        {new Date(startTime).toLocaleString()}
      </p>
      <p>
        <span className="font-medium">End time:</span>{" "}
        {new Date(endTime).toLocaleString()}
      </p>
    </li>
  );
}
