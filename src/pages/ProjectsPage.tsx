import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import ProjectsSearchBar from "../components/projects/components/ProjectsSearchBar";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import ProjectsList from "../components/projects/components/ProjectsList";
import Select from "../components/Select";

import ProjectsProvider from "../contexts/ProjectsContext";
import { projectsFiltersSchema } from "../schemas/projectsFilters.schema";
import { ProjectFilters } from "../types/project.type";

const stateOptions = [
  { value: "upcoming", text: "Upcoming" },
  { value: "progress", text: "In progess" },
  { value: "finished", text: "Finished" },
];

export const PER_PAGE = 9;

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
        <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
          <div className="flex items-center justify-between gap-4">
            <PageTitle>Projects</PageTitle>
            <Select
              name="state"
              placeholder="Select the state"
              options={stateOptions}
            />
          </div>
          {watch("state") ? (
            <div className="flex flex-col gap-3">
              <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
                <ProjectsSearchBar />
                <Button className="text-nowrap">Create project</Button>
              </div>
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
