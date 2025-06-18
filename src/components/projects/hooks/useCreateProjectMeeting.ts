import { useState } from "react";
import toast from "react-hot-toast";

import { CreateMeeting } from "../../../types/meeting.type";
import { MeetingsApi } from "../../../services/MeetingsApi";

export function useCreateProjectMeeting() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createProjectMeeting(projectId: string, meeting: CreateMeeting) {
    setIsLoading(true);
    MeetingsApi.createProjectMeeting(projectId, meeting)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createProjectMeeting, isLoading };
}
