import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Meeting } from "../../../types/meeting.type";
import { MeetingsApi } from "../../../services/MeetingsApi";
import { mapMeeting } from "../../../utlis/mapMeeting";
import { MeetingPresence } from "../../../types/meetingAttendance.type";
import { mapPresence } from "../../../utlis/mapPresence";

export function useMeeting() {
  const [meeting, setMeeting] = useState<Meeting>({
    id: "",
    startTime: "",
    endTime: "",
    duration: "",
    note: "",
  });
  const [attendance, setAttendance] = useState<MeetingPresence[]>([]);
  const [attendendanceExcelURL, setAttendendanceExcelURL] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAttendendanceExcelURLLoading, setAttendendanceExcelURLIsLoading] =
    useState<boolean>(true);
  const { meetingId } = useParams();

  useEffect(() => {
    if (meetingId) {
      MeetingsApi.getAttendanceExcel(meetingId)
        .then((res) => {
          const blob = new Blob([res], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);

          setAttendendanceExcelURL(url);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setAttendendanceExcelURLIsLoading(false));
    }
  }, [meetingId]);

  useEffect(() => {
    if (meetingId) {
      MeetingsApi.getMeeting(meetingId)
        .then((res) => {
          const meeting = mapMeeting(res.meeting);
          const attendance = res.attendance.map((presence) =>
            mapPresence(presence),
          );

          setMeeting(meeting);
          setAttendance(attendance);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    }
  }, [meetingId]);

  return {
    meeting,
    attendance,
    attendendanceExcelURL,
    isLoading,
    isAttendendanceExcelURLLoading,
  };
}
