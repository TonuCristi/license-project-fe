import { useState } from "react";
import toast from "react-hot-toast";

import { CreateMeeting } from "../../../types/meeting.type";
import { MeetingsApi } from "../../../services/MeetingsApi";

export function useCreateTeamMeeting() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createTeamMeeting(teamId: string, meeting: CreateMeeting) {
    setIsLoading(true);
    MeetingsApi.createTeamMeeting(teamId, meeting)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createTeamMeeting, isLoading };
}
