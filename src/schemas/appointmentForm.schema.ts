import { z } from "zod";

export const appointmentFormSchema = z.object({
  attendee: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(30, {
      message: "The attendee name should't be longer than 30 characters!",
    }),
  attendeePhoneNumber: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(10, {
      message:
        "The attendee phone number should't be longer than 10 characters!",
    }),
  location: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(60, {
      message: "The location should't be longer than 60 characters!",
    }),
  date: z.string().refine((val) => (val ? val + ":00Z" : false), {
    message: "Invalid date!",
  }),
  duration: z.string().min(1, "You should select the duration!"),
  note: z
    .string()
    .min(1, { message: "This field should't be empty!" })
    .max(200, {
      message: "The note should't be longer than 200 characters!",
    }),
});
