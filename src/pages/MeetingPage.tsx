import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import Attendance from "../components/meetings/components/Attendance";

import { useMeeting } from "../components/meetings/hooks/useMeeting";
import { formatDate } from "../utlis/formatDate";

export default function MeetingPage() {
  const {
    meeting,
    attendance,
    attendendanceExcelURL,
    isLoading,
    isAttendendanceExcelURLLoading,
  } = useMeeting();

  const { note, teamName, projectName } = meeting;

  function getMeetingName() {
    if (teamName) {
      return `${teamName} Team`;
    }

    if (projectName) {
      return `${projectName} Project`;
    }
  }

  const presenceCount = attendance.reduce(
    (acc, presence) => acc + (presence.attended ? 1 : 0),
    0,
  );

  const downloadName = `${getMeetingName()}Meeting Attendance.xlsx`;

  if (isLoading || isAttendendanceExcelURLLoading) {
    return (
      <main className="border-primary m-auto flex h-screen w-full flex-col items-center justify-center gap-2 border-x-2 p-2 sm:p-4 lg:w-5xl">
        <Loader />
      </main>
    );
  }

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-6 overflow-x-hidden overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex flex-col gap-2">
        <PageTitle>{`${getMeetingName()} Meeting`}</PageTitle>

        <div className="flex flex-col gap-1 break-all">
          <p>
            <span className="font-medium">Start time:</span>{" "}
            {formatDate(meeting.startTime)}
          </p>
          <p>
            <span className="font-medium">End time:</span>{" "}
            {formatDate(meeting.endTime)}
          </p>
          <p>
            <span className="font-medium">Note:</span> {note}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="xs:flex-row xs:items-center flex flex-col justify-between gap-2">
          <h2 className="text-md font-medium">
            Attendance {`${presenceCount}/${attendance.length}`}
          </h2>
          <a
            href={attendendanceExcelURL}
            download={downloadName}
            className="font-medium"
          >
            Download attendance
          </a>
        </div>
        <Attendance attendance={attendance} />
      </div>
    </main>
  );
}
