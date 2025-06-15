type Props = {
  startDate: string;
  deadline: string;
};

export default function ProjectElapsedTime({ startDate, deadline }: Props) {
  const startDateInMs = new Date(startDate).getTime();
  const deadlineInMs = new Date(deadline).getTime();
  const todayDate = Date.now();

  const elapsedTimeTotal = deadlineInMs - startDateInMs;
  const elapsedTime = todayDate - startDateInMs;

  function getElapsedTime() {
    const elapsedTimePercent = (elapsedTime * 100) / elapsedTimeTotal;

    if (todayDate < startDateInMs) {
      return Number(0).toFixed(2);
    }

    if (todayDate > deadlineInMs) {
      return Number(100).toFixed(2);
    }

    return elapsedTimePercent.toFixed(2);
  }

  return (
    <div className="flex w-11/12 flex-col gap-1">
      <div className="border-primary relative h-8 w-full rounded-full border-2 bg-blue-100">
        <div
          style={{
            width: `${getElapsedTime()}%`,
          }}
          className="abosolute top-0 left-0 h-7 rounded-full bg-blue-400 transition-all duration-300 ease-linear"
        ></div>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
          {getElapsedTime()}%
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">
          {new Date(startDate).toLocaleDateString()}
        </p>
        <p className="font-medium">{new Date(deadline).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
