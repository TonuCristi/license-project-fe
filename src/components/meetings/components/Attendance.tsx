import { HiMiniCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import { MeetingPresence } from "../../../types/meetingAttendance.type";

type Props = {
  attendance: MeetingPresence[];
};

export default function Attendance({ attendance }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {attendance.map((attendee) => (
        <li
          key={attendee.email}
          className="border-primary flex rounded-lg border-2 p-2"
        >
          <div className="flex flex-col gap-1 break-all">
            <p>
              <span className="font-medium">Full name:</span>{" "}
              {attendee.fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {attendee.email}
            </p>
          </div>
          <p className="ml-auto self-start">
            {attendee.attended ? (
              <HiMiniCheckCircle className="text-2xl text-green-500" />
            ) : (
              <HiMiniXCircle className="text-2xl text-red-500" />
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}
