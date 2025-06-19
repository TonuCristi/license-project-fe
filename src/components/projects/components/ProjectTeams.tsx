import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import ProjectTeamsSearchBar from "./ProjectTeamsSearchBar";
import ProjectTeamsList from "./ProjectTeamsList";

import { SearchBar } from "../../../types/searchBar.type";
import { searchBarSchema } from "../../../schemas/searchBar.schema";
import { useProjectTeams } from "../hooks/useProjectTeams";

type Props = {
  projectId: string;
};

export default function ProjectTeams({ projectId }: Props) {
  const methods = useForm<SearchBar>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchBarSchema),
  });
  const {
    deleteProjectTeam,
    getTeams,
    teams,
    pages,
    offset,
    isTeamsLoading,
    isDeleteLoading,
    setTeams,
    setOffset,
  } = useProjectTeams();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-2">
        <h2 className="text-md font-medium">Project teams</h2>
        <ProjectTeamsSearchBar
          projectId={projectId}
          getTeams={getTeams}
          setTeams={setTeams}
          setOffset={setOffset}
        />
        <ProjectTeamsList
          projectId={projectId}
          deleteProjectTeam={deleteProjectTeam}
          getTeams={getTeams}
          teams={teams}
          pages={pages}
          offset={offset}
          isTeamsLoading={isTeamsLoading}
          isDeleteLoading={isDeleteLoading}
          setOffset={setOffset}
        />
      </div>
    </FormProvider>
  );
}
