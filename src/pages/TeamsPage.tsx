import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageTitle from "../components/PageTitle";
import TeamsSearchBar from "../components/teams/components/TeamsSearchBar";
import CreateTeamButton from "../components/teams/components/CreateTeamButton";
import TeamsList from "../components/teams/components/TeamsList";

import TeamsProvider from "../contexts/TeamsContext";
import { SearchBar } from "../types/searchBar.type";
import { searchBarSchema } from "../schemas/searchBar.schema";

export const PER_PAGE = 9;

export default function TeamsPage() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchBarSchema),
  });

  return (
    <TeamsProvider>
      <FormProvider {...methods}>
        <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-y-auto border-x-2 p-2 sm:p-4 lg:w-5xl">
          <PageTitle>Teams</PageTitle>
          <div className="xxs:grid-cols-[80fr_20fr] grid grid-cols-1 items-center gap-2">
            <TeamsSearchBar />
            <CreateTeamButton />
          </div>
          <TeamsList />
        </main>
      </FormProvider>
    </TeamsProvider>
  );
}
