import { useContext, useEffect, useState } from "react";

import { MeetingsApi } from "../../../services/MeetingsApi";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

export function useFetchMeetingsYears(type: string, state: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setMeetingsYears } = useContext(MeetingsContext);

  useEffect(() => {
    setIsLoading(true);
    MeetingsApi.getMeetingsYears(type, state)
      .then((res) => setMeetingsYears(res))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [setMeetingsYears, type, state]);

  return {
    isLoading,
  };
}
