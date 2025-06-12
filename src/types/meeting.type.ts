import { z } from "zod";
import { meetingFormSchema } from "../schemas/meetingForm.schema";
import { meetingsFiltersSchema } from "../schemas/meetingsFilters.schema";

export type CreateMeeting = z.infer<typeof meetingFormSchema>;

export type EditMeeting = z.infer<typeof meetingFormSchema>;

export type MeetingDateFilters = z.infer<typeof meetingsFiltersSchema>;

export type MeetingResponse = {
  _id: string;
  date: string;
  endTime: string;
  duration: string;
  note: string;
  teamName?: string;
  projectName?: string;
};

export type Meeting = {
  id: string;
  startTime: string;
  endTime: string;
  duration: string;
  note: string;
  teamName?: string;
  projectName?: string;
};

export type Meetings = {
  month: string;
  meetings: Meeting[];
}[];
