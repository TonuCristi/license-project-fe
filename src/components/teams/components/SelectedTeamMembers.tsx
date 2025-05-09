import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import TeamMembersSearchBar from "./TeamMembersSearchBar";
import TeamMembersList from "./TeamMembersList";

import { SearchBar } from "../../../types/searchBar.type";
import { searchBarSchema } from "../../../schemas/searchBar.schema";

export default function SelectedTeamMembers() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(searchBarSchema),
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-2">
        <TeamMembersSearchBar />
        <TeamMembersList />
      </div>
    </FormProvider>
  );
}
