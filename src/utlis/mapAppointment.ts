import { AppointmentResponse } from "../types/appointment.type";

export function mapAppointment(appointment: AppointmentResponse) {
  const { _id: id, user_id: userId, date: startTime, ...rest } = appointment;

  return { id, userId, startTime, ...rest };
}
