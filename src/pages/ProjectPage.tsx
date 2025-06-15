import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

import { useFetchProject } from "../components/projects/hooks/useFetchProject";

const projectState = {
  pending: "Pending",
  progress: "In progess",
  finished: "Finished",
};

export default function ProjectPage() {
  const { project, isLoading } = useFetchProject();

  const { name, description, state, progress } = project;

  const startDate = new Date(project.startDate).toLocaleDateString();
  const deadline = new Date(project.deadline).toLocaleDateString();

  if (isLoading) {
    return (
      <main className="border-primary m-auto flex h-screen w-full flex-col items-center justify-center gap-2 border-x-2 p-2 sm:p-4 lg:w-5xl">
        <Loader />
      </main>
    );
  }

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-2 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex items-center justify-between gap-2">
        <PageTitle>{`${project.name} project`}</PageTitle>
        <p className="bg-primary rounded-xl p-2 font-medium text-white">
          {projectState[state]}
        </p>
      </div>
      <div className="border-primary flex flex-col justify-between gap-1 border-t-2 pt-2 break-all">
        <p>
          <span className="font-medium">Name:</span> {name}
        </p>
        <p>
          <span className="font-medium">Start date:</span> {startDate}
        </p>
        <p>
          <span className="font-medium">Deadline:</span> {deadline}
        </p>
        <p>
          <span className="font-medium">Description:</span> {description}
        </p>
        <p>
          <span className="font-medium">Progress:</span> {progress}
        </p>
      </div>
    </main>
  );
}
