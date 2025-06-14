import { twMerge } from "tailwind-merge";

import Button from "../../Button";

import { Project } from "../../../types/project.type";

type Props = {
  project: Project;
};

export default function ProjectListItem({ project }: Props) {
  const startDate = new Date(project.startDate).toLocaleDateString();
  const deadline = new Date(project.deadline).toLocaleDateString();

  return (
    <li
      className={twMerge(
        "border-primary xs:flex-row flex flex-col justify-between gap-2 rounded-xl border-2 p-2",
      )}
    >
      <div className="flex flex-col gap-1 break-all">
        <p>
          <span className="font-medium">Name:</span> {project.name}
        </p>
        <p>
          <span className="font-medium">Start date:</span> {startDate}
        </p>
        <p>
          <span className="font-medium">Deadline:</span> {deadline}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 self-start">
        <Button variant="reject">Delete</Button>
        <Button>Edit</Button>
      </div>
    </li>
  );
}
