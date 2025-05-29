import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { MeetingResponse } from "../types/meeting.type";

const TEAM_MEETINGS_URL = "/api/meetings";

export const MeetingsApi = {
  getMeetingsYears(meetingType: string) {
    return api
      .get(
        `${TEAM_MEETINGS_URL}/retrieve-meetings-years?meetingType=${meetingType}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetingsYears: number[] }>) =>
          data.meetingsYears,
      );
  },
  getTeamMeetings(
    meetingType: string,
    year: string,
    month: string,
    day: string,
  ) {
    return api
      .get(
        `${TEAM_MEETINGS_URL}/retrieve-meetings?meetingType=${meetingType}&year=${year}&month=${month}&day=${day}`,
      )
      .then(
        ({ data }: AxiosResponse<{ meetings: MeetingResponse[] }>) =>
          data.meetings,
      );
  },
};
