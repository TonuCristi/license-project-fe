import { z } from "zod";
import { appointmentFormSchema } from "../schemas/appointmentForm.schema";

export type CreateAppointment = z.infer<typeof appointmentFormSchema>;

export type EditAppointment = z.infer<typeof appointmentFormSchema>;

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
