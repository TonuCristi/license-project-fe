import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import ProjectsSearchBar from "../components/projects/components/ProjectsSearchBar";
import PageTitle from "../components/PageTitle";
import ProjectsList from "../components/projects/components/ProjectsList";
import Select from "../components/Select";
import CreateProjectButton from "../components/projects/components/CreateProjectButton";

import ProjectsProvider from "../contexts/ProjectsContext";
import { projectsFiltersSchema } from "../schemas/projectsFilters.schema";
import { ProjectFilters } from "../types/project.type";

const stateOptions = [
  { value: "pending", text: "Pending" },
  { value: "progress", text: "In progess" },
  { value: "finished", text: "Finished" },
];

export default function ProjectsPage() {
  const methods = useForm<ProjectFilters>({
    defaultValues: {
      search: "",
      state: "",
    },
    resolver: zodResolver(projectsFiltersSchema),
  });

  const { watch } = methods;

  return (
    <ProjectsProvider>
      <FormProvider {...methods}>
        <main className="border-primary scrollbar xs:gap-5 m-auto flex h-full w-full flex-col gap-2 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
          <div className="xs:flex-row xs:items-center flex flex-col justify-between gap-2">
            <PageTitle>Projects</PageTitle>
            <div className="xs:ml-auto">
              <Select
                name="state"
                placeholder="Select the state"
                options={stateOptions}
                className="xs:w-auto w-full"
              />
            </div>
            <CreateProjectButton />
          </div>
          {watch("state") ? (
            <div className="flex flex-col gap-3">
              <ProjectsSearchBar />
              <ProjectsList />
            </div>
          ) : (
            <p>Select the state to see the projects.</p>
          )}
        </main>
      </FormProvider>
    </ProjectsProvider>
  );
}
