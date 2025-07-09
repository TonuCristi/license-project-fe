import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  CreateMeeting,
  EditMeeting,
  MeetingResponse,
} from "../types/meeting.type";
import { MeetingPresenceResponse } from "../types/meetingAttendance.type";

const URL = "/api/meetings";

export const MeetingsApi = {
  getMeetingsYears(type: string, state: string) {
    return api
      .get(`${URL}/retrieve-meetings-years?type=${type}&state=${state}`)
      .then(
        ({ data }: AxiosResponse<{ meetingsYears: number[] }>) =>
          data.meetingsYears,
      );
  },
  getMeetings(
    type: string,
    state: string,
    year: string,
    month: string,
    day: string,
  ) {
    return api
      .get(
        `${URL}/retrieve-meetings?type=${type}&state=${state}&year=${year}&month=${month}&day=${day}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetings: MeetingResponse[] }>) =>
          data.meetings,
      );
  },
  getMeeting(meetingId: string) {
    return api.get(`${URL}/retrieve-meeting/${meetingId}`).then(
      ({
        data,
      }: AxiosResponse<{
        meeting: MeetingResponse;
        attendance: MeetingPresenceResponse[];
      }>) => data,
    );
  },
  getAttendanceExcel(meetingId: string) {
    return api
      .get(`${URL}/retrieve-attendance-excel/${meetingId}`, {
        responseType: "blob",
      })
      .then(({ data }) => data);
  },
  createTeamMeeting(teamId: string, meeting: CreateMeeting) {
    return api
      .post(`${URL}/create-team-meeting/${teamId}`, meeting)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editMeeting(meetingId: string, newEditedMeeting: EditMeeting) {
    return api.put(`${URL}/edit-meeting/${meetingId}`, newEditedMeeting).then(
      ({
        data,
      }: AxiosResponse<{
        editedMeeting: MeetingResponse;
        message: string;
      }>) => data,
    );
  },
  deleteMeeting(meetingId: string) {
    return api.delete(`${URL}/delete-meeting/${meetingId}`).then(
      ({
        data,
      }: AxiosResponse<{
        message: string;
      }>) => data,
    );
  },
  createProjectMeeting(projectId: string, meeting: CreateMeeting) {
    return api
      .post(`${URL}/create-project-meeting/${projectId}`, meeting)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
