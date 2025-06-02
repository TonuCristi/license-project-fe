import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  CreateMeeting,
  EditMeeting,
  MeetingResponse,
} from "../types/meeting.type";

const URL = "/api/meetings";

export const MeetingsApi = {
  getMeetingsYears(meetingType: string, meetingState: string) {
    return api
      .get(
        `${URL}/retrieve-meetings-years?meetingType=${meetingType}&meetingState=${meetingState}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetingsYears: number[] }>) =>
          data.meetingsYears,
      );
  },
  getMeetings(
    meetingType: string,
    meetingState: string,
    year: string,
    month: string,
    day: string,
  ) {
    return api
      .get(
        `${URL}/retrieve-meetings?meetingType=${meetingType}&meetingState=${meetingState}&year=${year}&month=${month}&day=${day}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetings: MeetingResponse[] }>) =>
          data.meetings,
      );
  },
  createTeamMeeting(teamId: string, meeting: CreateMeeting) {
    return api
      .post(`${URL}/create-team-meeting/${teamId}`, meeting)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editTeamMeeting(meetingId: string, newEditedMeeting: EditMeeting) {
    return api
      .put(`${URL}/edit-team-meeting/${meetingId}`, newEditedMeeting)
      .then(
        ({
          data,
        }: AxiosResponse<{
          editedMeeting: MeetingResponse;
          message: string;
        }>) => data,
      );
  },
  deleteTeamMeeting(meetingId: string) {
    return api.delete(`${URL}/delete-team-meeting/${meetingId}`).then(
      ({
        data,
      }: AxiosResponse<{
        message: string;
      }>) => data,
    );
  },
};
