import { Project } from "../../../types/project.type";

type Props = {
  project: Project;
};

export default function ProjectElapsedTime({ project }: Props) {
  const startDate = new Date(project.startDate);
  const deadline = new Date(project.deadline);
  const todayDate = Date.now();

  const elapsedTimeTotal = deadline.getTime() - startDate.getTime();
  const elapsedTime = todayDate - startDate.getTime();

  function getElapsedTime() {
    const elapsedTimePercent =
      todayDate > startDate.getTime()
        ? (elapsedTime * 100) / elapsedTimeTotal
        : 0;

    if (todayDate < startDate.getTime()) {
      return Number(0).toFixed(2);
    }

    if (todayDate > deadline.getTime()) {
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
        <p className="font-medium">{startDate.toLocaleDateString()}</p>
        <p className="font-medium">{deadline.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
