import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { AppointmentsResponse } from "../types/appointment.type";

const URL = "/api/appointments";

export const AppointmentsApi = {
  getAppointments(year?: number, month?: number, day?: number) {
    return api
      .get(
        `${URL}/retrieve-appointments?year=${year || ""}&month=${month || ""}&day=${day || ""}`,
      )
      .then(
        ({
          data,
        }: AxiosResponse<{
          appointments: AppointmentsResponse;
        }>) => data.appointments,
      );
  },
};
