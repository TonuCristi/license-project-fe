import { AxiosResponse } from "axios";
import { api } from "../config/api";

const URL = "/api/attendance";

export const MeetingAttendanceApi = {
  checkPresence(token: string, attendeeEmail: string) {
    return api
      .post(`${URL}/check-presence?token=${token}`, { attendeeEmail })
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
