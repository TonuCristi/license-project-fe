import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";

import { MeetingsApi } from "../../../services/MeetingsApi";
import { MeetingsContext } from "../../../contexts/MeetingsContext";

export function useDeleteTeamMeeting() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setMeetings } = useContext(MeetingsContext);

  const { getValues } = useFormContext();

  function getDeleteMeeting(meetingId: string) {
    return getValues().type === "team"
      ? MeetingsApi.deleteTeamMeeting(meetingId)
      : MeetingsApi.deleteProjectMeeting(meetingId);
  }

  function deleteTeamMeeting(meetingId: string) {
    setIsLoading(true);
    getDeleteMeeting(meetingId)
      .then((res) => {
        setMeetings((prev) => [
          ...prev.filter((meeting) => meeting.id !== meetingId),
        ]);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteTeamMeeting, isLoading };
}
