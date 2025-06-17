import { useFormContext } from "react-hook-form";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { EditMeeting } from "../../../types/meeting.type";
import { MeetingsApi } from "../../../services/MeetingsApi";
import { MeetingsContext } from "../../../contexts/MeetingsContext";
import { mapMeeting } from "../../../utlis/mapMeeting";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function useEditMeeting() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setMeetings, setMeetingsYears } = useContext(MeetingsContext);

  const { getValues } = useFormContext();

  function getEditMeeting(meetingId: string, newEditedMeeting: EditMeeting) {
    return getValues().type === "team"
      ? MeetingsApi.editTeamMeeting(meetingId, newEditedMeeting)
      : MeetingsApi.editProjectMeeting(meetingId, newEditedMeeting);
  }

  function editMeeting(meetingId: string, newEditedMeeting: EditMeeting) {
    setIsLoading(true);
    getEditMeeting(meetingId, newEditedMeeting)
      .then((res) => {
        const editedMeeting = mapMeeting(res.editedMeeting);

        const editedMeetingYear = new Date(
          editedMeeting.startTime,
        ).getFullYear();
        const filterYear = +getValues().year;
        const editedMeetingMonth =
          months[new Date(editedMeeting.startTime).getMonth()];
        const filterMonth = months[+getValues().month];

        // Deletes the meeting if the edited meeting year is not the same as the filter year
        if (editedMeetingYear !== filterYear) {
          setMeetings((prev) => [
            ...prev.filter((meeting) => meeting.id !== editedMeeting.id),
          ]);

          setMeetingsYears((prev) => {
            if (prev.includes(editedMeetingYear)) return prev;

            return [...prev, editedMeetingYear].sort((a, b) => a - b);
          });

          return toast.success(res.message);
        }

        // Deletes the meeting if the edited meeting month is not the same as the filter month
        if (getValues().month && editedMeetingMonth !== filterMonth) {
          setMeetings((prev) => [
            ...prev.filter((meeting) => meeting.id !== editedMeeting.id),
          ]);

          return toast.success(res.message);
        }

        // Replaces the old meeting with the edited meeting
        setMeetings((prev) => [
          ...prev.filter((meeting) => meeting.id !== editedMeeting.id),
          editedMeeting,
        ]);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editMeeting, isLoading };
}
