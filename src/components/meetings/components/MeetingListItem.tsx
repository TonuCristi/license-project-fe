import { HiMiniInformationCircle } from "react-icons/hi2";
import Button from "../../Button";
import EditMeetingButton from "./EditMeetingButton";

import { formatDate } from "../../../utlis/formatDate";
import { Meeting } from "../../../types/meeting.type";

type Props = {
  meeting: Meeting;
};

export default function MeetingListItem({ meeting }: Props) {
  const { id, note, teamName, projectName } = meeting;

  const startTime = formatDate(meeting.startTime);
  const endTime = formatDate(meeting.endTime);

  return (
    <li className="border-primary flex rounded-lg border-2 p-2">
      <div className="flex w-full flex-col gap-2">
        {teamName ? (
          <p>
            <span className="font-medium">Team:</span> {teamName}
          </p>
        ) : (
          <p>
            <span className="font-medium">Project:</span> {projectName}
          </p>
        )}
        <p>
          <span className="font-medium">Start time:</span> {startTime}
        </p>
        <p>
          <span className="font-medium">End time:</span> {endTime}
        </p>
      </div>
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* <DeleteAppointmentButton appointmentId={id} /> */}
          <Button variant="reject">Delete</Button>
          <EditMeetingButton meeting={meeting} />
        </div>

        {note.length && (
          <div className="group relative self-end">
            <HiMiniInformationCircle className="text-primary cursor-pointer text-xl" />
            <p className="border-primary scrollbar absolute right-0 bottom-full hidden h-24 w-44 overflow-hidden overflow-y-auto rounded-lg border-2 bg-white p-1 break-all group-hover:block">
              {note}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}
