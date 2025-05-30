import { useContext } from "react";

import { MeetingsContext } from "../../../contexts/MeetingsContext";
import { MeetingsApi } from "../../../services/MeetingsApi";
import { mapMeeting } from "../../../utlis/mapMeeting";

export function useFetchMeetings() {
  const { setMeetings, setIsLoading } = useContext(MeetingsContext);

  function getTeamMeetings(
    meetingType: string,
    meetingState: string,
    year: string,
    month: string,
    day: string,
  ) {
    setIsLoading(true);
    MeetingsApi.getTeamMeetings(meetingType, meetingState, year, month, day)
      .then((res) => {
        const meetings = res.map((meeting) => mapMeeting(meeting));
        setMeetings(meetings);
      })
      .finally(() => setIsLoading(false));
  }

  return { getTeamMeetings };
}
