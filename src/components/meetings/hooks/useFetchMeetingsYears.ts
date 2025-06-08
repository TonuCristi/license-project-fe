import { useContext, useEffect, useState } from "react";

import { MeetingsApi } from "../../../services/MeetingsApi";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

export function useFetchMeetingsYears(
  meetingType: string,
  meetingState: string,
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setMeetingsYears } = useContext(MeetingsContext);

  useEffect(() => {
    MeetingsApi.getMeetingsYears(meetingType, meetingState)
      .then((res) => setMeetingsYears(res))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [meetingType, meetingState, setMeetingsYears]);

  return {
    isLoading,
  };
}
