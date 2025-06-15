import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

import Button from "../components/Button";
import ProjectProgressBar from "../components/projects/components/ProjectProgressBar";
import ProjectSection from "../components/projects/components/ProjectSection";
import ProjectSectionTitle from "../components/projects/components/ProjectSectionTitle";
import ProjectElapsedTime from "../components/projects/components/ProjectElapsedTime";

import { ProjectState } from "../types/project.type";
import { useProject } from "../components/projects/hooks/useProject";

const projectState = {
  pending: "Pending",
  progress: "In progess",
  finished: "Finished",
};

export default function ProjectPage() {
  const { editProgress, project, isLoading, isEditProgressLoading } =
    useProject();

  const { description, state, progress } = project;

  function getStatusColor(state: ProjectState) {
    const states = {
      pending: "bg-gray-500",
      progress: "bg-primary",
      finished: "bg-emerald-500",
    };

    return states[state];
  }

  if (isLoading) {
    return (
      <main className="border-primary m-auto flex h-screen w-full flex-col items-center justify-center gap-2 border-x-2 p-2 sm:p-4 lg:w-5xl">
        <Loader />
      </main>
    );
  }

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex items-center gap-2">
        <PageTitle>{`${project.name} project`}</PageTitle>
        <Button variant="reject" className="ml-auto">
          Delete
        </Button>
        <Button>Edit</Button>
        <p
          className={`rounded-xl p-2 font-medium text-white ${getStatusColor(state)}`}
        >
          {projectState[state]}
        </p>
      </div>

      <ProjectSection className="items-center">
        <ProjectSectionTitle>Elapsed time</ProjectSectionTitle>
        <ProjectElapsedTime project={project} />
      </ProjectSection>

      <ProjectSection className="items-center">
        <ProjectSectionTitle>Progress</ProjectSectionTitle>
        <ProjectProgressBar
          projectId={project.id}
          progress={progress}
          editProgress={editProgress}
          isEditProgressLoading={isEditProgressLoading}
        />
      </ProjectSection>

      <ProjectSection>
        <ProjectSectionTitle>Description</ProjectSectionTitle>
        <p>{description}</p>
      </ProjectSection>
    </main>
  );
}
