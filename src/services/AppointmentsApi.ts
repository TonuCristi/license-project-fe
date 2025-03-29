import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  AppointmentResponse,
  AppointmentsResponse,
  CreateAppointment,
  EditAppointment,
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
        appointmentsYears: number[];
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
  deleteAppointment(appointmentId: string) {
    return api.delete(`${URL}/delete-appointment/${appointmentId}`).then(
      ({
        data,
      }: AxiosResponse<{
        deletedAppointment: AppointmentResponse;
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
          oldAppointment: AppointmentResponse;
          message: string;
        }>) => data,
      );
  },
};
