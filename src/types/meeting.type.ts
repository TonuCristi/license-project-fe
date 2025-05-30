export type MeetingResponse = {
  _id: string;
  date: string;
  endTime: string;
  note: string;
  teamName?: string;
  projectName?: string;
};

export type Meeting = {
  id: string;
  startTime: string;
  endTime: string;
  note: string;
  teamName?: string;
  projectName?: string;
};

export type Meetings = {
  month: string;
  meetings: Meeting[];
}[];
