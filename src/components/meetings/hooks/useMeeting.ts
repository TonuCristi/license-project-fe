import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import { EditMeeting, Meeting } from "../../../types/meeting.type";
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
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isAttendendanceExcelURLLoading, setAttendendanceExcelURLIsLoading] =
    useState<boolean>(true);
  const { meetingId } = useParams();
  const navigate = useNavigate();

  function editMeeting(meetingId: string, newEditedMeeting: EditMeeting) {
    setIsEditLoading(true);
    MeetingsApi.editMeeting(meetingId, newEditedMeeting)
      .then((res) => {
        const editedMeeting = mapMeeting(res.editedMeeting);

        setMeeting(editedMeeting);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsEditLoading(false));
  }

  function deleteMeeting(meetingId: string) {
    setIsDeleteLoading(true);
    MeetingsApi.deleteMeeting(meetingId)
      .then((res) => {
        navigate("/meetings");

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsDeleteLoading(false));
  }

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
    editMeeting,
    deleteMeeting,
    meeting,
    attendance,
    attendendanceExcelURL,
    isLoading,
    isEditLoading,
    isDeleteLoading,
    isAttendendanceExcelURLLoading,
  };
}
