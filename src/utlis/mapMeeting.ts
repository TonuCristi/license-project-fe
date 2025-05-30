import { MeetingResponse } from "../types/meeting.type";

export function mapMeeting(meeting: MeetingResponse) {
  const { _id: id, date: startTime, ...rest } = meeting;

  return { id, startTime, ...rest };
}
