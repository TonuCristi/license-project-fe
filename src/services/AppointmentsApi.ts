import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  AppointmentResponse,
  AppointmentsResponse,
  CreateAppointment,
} from "../types/appointment.type";

const URL = "/api/appointments";

export const AppointmentsApi = {
  getAppointments(year?: string, month?: string, day?: string) {
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
  getAppointmentsYears() {
    return api.get(`${URL}/retrieve-appointments-years`).then(
      ({
        data,
      }: AxiosResponse<{
        appointmentsYears: string[];
      }>) => data.appointmentsYears,
    );
  },
  createAppointment(appointment: CreateAppointment) {
    return api
      .post(`${URL}/create-appointment`, appointment)
      .then(
        ({ data }: AxiosResponse<{ appointment: AppointmentResponse }>) =>
          data.appointment,
      );
  },
};
