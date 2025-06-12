import { useContext } from "react";

import { MeetingsContext } from "../../../contexts/MeetingsContext";
import { MeetingsApi } from "../../../services/MeetingsApi";
import { mapMeeting } from "../../../utlis/mapMeeting";

export function useFetchMeetings() {
  const { setMeetings, setIsLoading } = useContext(MeetingsContext);

  function getMeetings(
    meetingType: string,
    meetingState: string,
    year: string,
    month: string,
    day: string,
  ) {
    setIsLoading(true);
    MeetingsApi.getMeetings(meetingType, meetingState, year, month, day)
      .then((res) => {
        const meetings = res.map((meeting) => mapMeeting(meeting));
        setMeetings(meetings);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { getMeetings };
}
