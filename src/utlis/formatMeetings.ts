import { Meeting, Meetings } from "../types/meeting.type";

export function formatMeetings(meetings: Meeting[]) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const meetingsCopy: Meeting[] = [];

  meetings.forEach((meeting) => meetingsCopy.push(meeting));

  const result: Meetings = meetingsCopy
    .map((meeting) => months[new Date(meeting.startTime).getMonth()])
    .filter((month, i, months) => months.indexOf(month) === i)
    .map((month) => ({ month, meetings: [] }));

  meetings.forEach((meeting) => {
    const meetingMonthIndex = result.findIndex(
      (meetingsPerMonth) =>
        months[new Date(meeting.startTime).getMonth()] ===
        meetingsPerMonth.month,
    );

    result[meetingMonthIndex].meetings.push(meeting);
  });

  result.map((meetingsPerMonth) => ({
    ...meetingsPerMonth,
    meetings: meetingsPerMonth.meetings.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    ),
  }));

  result.sort((a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  });

  return result;
}
