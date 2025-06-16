import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

import ProjectProgressBar from "../components/projects/components/ProjectProgressBar";
import ProjectSection from "../components/projects/components/ProjectSection";
import ProjectSectionTitle from "../components/projects/components/ProjectSectionTitle";
import ProjectElapsedTime from "../components/projects/components/ProjectElapsedTime";
import ProjectStateDropdown from "../components/projects/components/ProjectStateDropdown";
import EditProjectButton from "../components/projects/components/EditProjectButton";
import DeleteProjectButton from "../components/projects/components/DeleteProjectButton";

import { useProject } from "../components/projects/hooks/useProject";

export default function ProjectPage() {
  const {
    editProject,
    editProgress,
    editState,
    deleteProject,
    project,
    isLoading,
    isEditLoading,
    isEditProgressLoading,
    isEditStateLoading,
    isDeleteLoading,
  } = useProject();

  const { name, description, state, progress, startDate, deadline } = project;

  if (isLoading) {
    return (
      <main className="border-primary m-auto flex h-screen w-full flex-col items-center justify-center gap-2 border-x-2 p-2 sm:p-4 lg:w-5xl">
        <Loader />
      </main>
    );
  }

  return (
    <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-2 overflow-x-hidden overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <PageTitle>{`${name} project`}</PageTitle>
          <ProjectStateDropdown
            projectId={project.id}
            state={state}
            editState={editState}
            isEditStateLoading={isEditStateLoading}
          />
        </div>
        <div className="xs:grid-cols-2 grid grid-cols-1 items-center gap-2 sm:w-1/2 sm:self-end">
          <DeleteProjectButton
            projectId={project.id}
            deleteProject={deleteProject}
            isDeleteLoading={isDeleteLoading}
          />
          <EditProjectButton
            project={project}
            editProject={editProject}
            isEditLoading={isEditLoading}
          />
        </div>
      </div>

      <ProjectSection className="items-center">
        <ProjectSectionTitle>Elapsed time</ProjectSectionTitle>
        <ProjectElapsedTime startDate={startDate} deadline={deadline} />
      </ProjectSection>

      <ProjectSection className="xs:h-22 items-center">
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
