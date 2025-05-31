import { useContext, useEffect, useState } from "react";

import { MeetingsApi } from "../../../services/MeetingsApi";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

export function useFetchMeetingsYears(
  meetingType: string,
  meetingState: string,
) {
  const { setMeetingsYears } = useContext(MeetingsContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    MeetingsApi.getMeetingsYears(meetingType, meetingState)
      .then((res) => setMeetingsYears(res))
      .finally(() => setIsLoading(false));
  }, [meetingType, meetingState, setMeetingsYears]);

  return {
    isLoading,
  };
}
