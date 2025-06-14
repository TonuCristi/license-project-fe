import { Project } from "../../../types/project.type";
import { Link } from "react-router";

type Props = {
  project: Project;
};

export default function ProjectListItem({ project }: Props) {
  const startDate = new Date(project.startDate).toLocaleDateString();
  const deadline = new Date(project.deadline).toLocaleDateString();

  return (
    <li className="border-primary rounded-xl border-2 p-2 transition-colors hover:bg-blue-200">
      <Link
        to={`/projects/${project.id}`}
        className="flex flex-col justify-between gap-1 break-all"
      >
        <p>
          <span className="font-medium">Name:</span> {project.name}
        </p>
        <p>
          <span className="font-medium">Start date:</span> {startDate}
        </p>
        <p>
          <span className="font-medium">Deadline:</span> {deadline}
        </p>
      </Link>
    </li>
  );
}
