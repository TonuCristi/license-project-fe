import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  AppointmentResponse,
  CreateAppointment,
  EditAppointment,
} from "../types/appointment.type";

const URL = "/api/appointments";

export const AppointmentsApi = {
  getAppointments(state: string, year: string, month: string, day: string) {
    return api
      .get(
        `${URL}/retrieve-appointments?state=${state}&year=${year || ""}&month=${month || ""}&day=${day || ""}`,
      )
      .then(
        ({
          data,
        }: AxiosResponse<{
          appointments: AppointmentResponse[];
        }>) => data.appointments,
      );
  },
  getAppointmentsYears(state: string) {
    return api.get(`${URL}/retrieve-appointments-years?state=${state}`).then(
      ({
        data,
      }: AxiosResponse<{
        appointmentsYears: number[];
      }>) => data.appointmentsYears,
    );
  },
  createAppointment(appointment: CreateAppointment) {
    return api.post(`${URL}/create-appointment`, appointment).then(
      ({
        data,
      }: AxiosResponse<{
        newAppointment: AppointmentResponse;
        message: string;
      }>) => data,
    );
  },
  deleteAppointment(appointmentId: string) {
    return api.delete(`${URL}/delete-appointment/${appointmentId}`).then(
      ({
        data,
      }: AxiosResponse<{
        message: string;
      }>) => data,
    );
  },
  editAppointment(
    appointmentId: string,
    newEditedAppointment: EditAppointment,
  ) {
    return api
      .put(`${URL}/edit-appointment/${appointmentId}`, newEditedAppointment)
      .then(
        ({
          data,
        }: AxiosResponse<{
          editedAppointment: AppointmentResponse;
          message: string;
        }>) => data,
      );
  },
};
