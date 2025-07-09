import { Link } from "react-router";

import Button from "../../Button";

import { formatDate } from "../../../utlis/formatDate";
import { Meeting } from "../../../types/meeting.type";

type Props = {
  meeting: Meeting;
};

export default function MeetingListItem({ meeting }: Props) {
  const { teamName, projectName } = meeting;

  const startTime = formatDate(meeting.startTime);
  const endTime = formatDate(meeting.endTime);

  return (
    <li className="border-primary xs:flex-row flex flex-col gap-2 rounded-lg border-2 p-2">
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
      <Link to={`/meetings/${meeting.id}`}>
        <Button className="text-nowrap">View meeting</Button>
      </Link>
    </li>
  );
}
