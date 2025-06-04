import { z } from "zod";
import { appointmentFormSchema } from "../schemas/appointmentForm.schema";
import { appointmentsFiltersSchema } from "../schemas/appointmentsFilters.schema";

export type CreateAppointment = z.infer<typeof appointmentFormSchema>;

export type EditAppointment = z.infer<typeof appointmentFormSchema>;

export type AppointmentDateFilters = z.infer<typeof appointmentsFiltersSchema>;

export type AppointmentResponse = {
  _id: string;
  attendee: string;
  attendeePhoneNumber: string;
  location: string;
  date: string;
  duration: string;
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
  duration: string;
  endTime: string;
  note: string;
  userId: string;
};

export type Appointments = {
  month: string;
  appointments: Appointment[];
}[];
