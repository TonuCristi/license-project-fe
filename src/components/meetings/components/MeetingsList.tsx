import { useContext } from "react";

import Loader from "../../Loader";
import MeetingListItem from "./MeetingListItem";

import { MeetingsContext } from "../../../contexts/MeetingsContext";
import { formatMeetings } from "../../../utlis/formatMeetings";

export default function MeetingsList() {
  const { meetings, isLoading } = useContext(MeetingsContext);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  const meetingsPerMonths = formatMeetings(meetings);

  return (
    <ul className="flex flex-col gap-4">
      {meetingsPerMonths.map((meetingsPerMonth) => (
        <li key={meetingsPerMonth.month}>
          <h2 className="mb-2 text-xl font-medium">{meetingsPerMonth.month}</h2>
          <ul className="flex flex-col gap-2">
            {meetingsPerMonth.meetings.map((meeting) => (
              <MeetingListItem key={meeting.id} meeting={meeting} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
