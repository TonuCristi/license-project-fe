import { useState } from "react";
import toast from "react-hot-toast";

import { MeetingAttendanceApi } from "../../../services/MeetingAttendanceApi";

export function useCheckPresence() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function checkPresence(token: string, attendeeEmail: string) {
    setIsLoading(true);
    MeetingAttendanceApi.checkPresence(token, attendeeEmail)
      .then((res) => {
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { checkPresence, isLoading };
}
