import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { AppointmentsResponse } from "../types/appointment.type";

const URL = "/api/appointments";

const controller = new AbortController();

export const AppointmentsApi = {
  getAppointments(year?: string, month?: string, day?: string) {
    return api
      .get(
        `${URL}/retrieve-appointments?year=${year || ""}&month=${month || ""}&day=${day || ""}`,
        { signal: controller.signal },
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
