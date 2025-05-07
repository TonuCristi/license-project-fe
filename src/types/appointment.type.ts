import { z } from "zod";
import { appointmentSchema } from "../schemas/createAppointment.schema";

export type CreateAppointment = z.infer<typeof appointmentSchema>;

export type EditAppointment = z.infer<typeof appointmentSchema>;

export type AppointmentResponse = {
  _id: string;
  attendee: string;
  attendeePhoneNumber: string;
  location: string;
  date: string;
  duration: number;
  endTime: string;
  note: string;
  user_id: string;
};

export type Appointment = {
  id: string;
  attendee: string;
  attendeePhoneNumber: string;
  location: string;
  startTime: string;
  duration: number;
  endTime: string;
  note: string;
  userId: string;
};

export type Appointments = {
  month: string;
  appointments: Appointment[];
}[];
