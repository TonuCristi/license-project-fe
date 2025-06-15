import { twMerge } from "tailwind-merge";

import Button from "../../Button";
import { ProjectProgress } from "../../../types/project.type";

const progressValues: ProjectProgress[] = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
];

type Props = {
  projectId: string;
  progress: ProjectProgress;
  editProgress: (projectId: string, progess: ProjectProgress) => void;
  isEditProgressLoading: boolean;
};

export default function ProjectProgressBar({
  projectId,
  progress,
  editProgress,
  isEditProgressLoading,
}: Props) {
  return (
    <div className="border-primary relative h-8 w-11/12 rounded-full border-2 bg-blue-100">
      <div
        style={{ width: `${progress}%` }}
        className="abosolute top-0 left-0 h-7 rounded-full bg-blue-400 transition-all duration-300 ease-linear"
      ></div>
      {progressValues.map((value) => (
        <Button
          key={value}
          variant="empty"
          style={{ left: `${value}%` }}
          disabled={isEditProgressLoading}
          onClick={() => editProgress(projectId, value)}
          className={twMerge(
            `border-primary absolute top-1/2 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-white`,
            value === progress && "bg-primary h-4 w-4",
          )}
        >
          <div className="h-1 w-1 rounded-full bg-white"></div>
        </Button>
      ))}
      {progressValues.map((value) => (
        <p
          key={value}
          style={{ left: `${value}%` }}
          className={twMerge(
            "absolute top-full mt-3 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-nowrap",
            value === progress && "text-sm font-bold",
          )}
        >
          {value}%
        </p>
      ))}
    </div>
  );
}
