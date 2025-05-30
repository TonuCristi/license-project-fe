import { useEffect, useState } from "react";

import { MeetingsApi } from "../../../services/MeetingsApi";

export function useFetchMeetingsYears(
  meetingType: string,
  meetingState: string,
) {
  const [years, setYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    MeetingsApi.getMeetingsYears(meetingType, meetingState)
      .then((res) => setYears(res))
      .finally(() => setIsLoading(false));
  }, [meetingType, meetingState]);

  return {
    years,
    isLoading,
  };
}
