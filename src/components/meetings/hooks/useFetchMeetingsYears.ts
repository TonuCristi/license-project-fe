import { useEffect, useState } from "react";

import { MeetingsApi } from "../../../services/MeetingsApi";

export function useFetchMeetingsYears(meetingType: string) {
  const [years, setYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    MeetingsApi.getMeetingsYears(meetingType)
      .then((res) => setYears(res))
      .finally(() => setIsLoading(false));
  }, [meetingType]);

  return {
    years,
    isLoading,
  };
}
