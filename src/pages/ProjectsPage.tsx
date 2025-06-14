import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import ProjectsSearchBar from "../components/projects/components/ProjectsSearchBar";
import PageTitle from "../components/PageTitle";
import Button from "../components/Button";
import ProjectsList from "../components/projects/components/ProjectsList";

import { SearchBar } from "../types/searchBar.type";
import { searchBarSchema } from "../schemas/searchBar.schema";
import ProjectsProvider from "../contexts/ProjectsContext";

export const PER_PAGE = 9;

export default function ProjectsPage() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchBarSchema),
  });

  return (
    <ProjectsProvider>
      <FormProvider {...methods}>
        <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
          <PageTitle>Projects</PageTitle>
          <div className="flex flex-col gap-3">
            <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
              <ProjectsSearchBar />
              <Button>Create project</Button>
            </div>
            <ProjectsList />
          </div>
        </main>
      </FormProvider>
    </ProjectsProvider>
  );
}
