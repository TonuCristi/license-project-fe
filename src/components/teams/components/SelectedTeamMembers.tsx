import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import TeamMembersSearchBar from "./TeamMembersSearchBar";
import TeamMembersList from "./TeamMembersList";

import { SearchBar } from "../../../types/searchBar.type";
import { searchBarSchema } from "../../../schemas/searchBar.schema";
import { useFetchTeamMembers } from "../hooks/useFetchTeamMembers";

export default function SelectedTeamMembers() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(searchBarSchema),
  });
  const {
    getTeamMembers,
    members,
    pages,
    offset,
    isLoading,
    setPages,
    setOffset,
  } = useFetchTeamMembers();

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-2">
        <TeamMembersSearchBar getTeamMembers={getTeamMembers} />
        <TeamMembersList
          getTeamMembers={getTeamMembers}
          members={members}
          pages={pages}
          offset={offset}
          isLoading={isLoading}
          setPages={setPages}
          setOffset={setOffset}
        />
      </div>
    </FormProvider>
  );
}
