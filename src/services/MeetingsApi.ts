import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { MeetingResponse } from "../types/meeting.type";

const TEAM_MEETINGS_URL = "/api/meetings";

export const MeetingsApi = {
  getMeetingsYears(meetingType: string, meetingState: string) {
    return api
      .get(
        `${TEAM_MEETINGS_URL}/retrieve-meetings-years?meetingType=${meetingType}&meetingState=${meetingState}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetingsYears: number[] }>) =>
          data.meetingsYears,
      );
  },
  getTeamMeetings(
    meetingType: string,
    meetingState: string,
    year: string,
    month: string,
    day: string,
  ) {
    return api
      .get(
        `${TEAM_MEETINGS_URL}/retrieve-meetings?meetingType=${meetingType}&meetingState=${meetingState}&year=${year}&month=${month}&day=${day}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetings: MeetingResponse[] }>) =>
          data.meetings,
      );
  },
};
