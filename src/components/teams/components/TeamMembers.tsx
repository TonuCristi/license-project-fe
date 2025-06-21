import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import TeamMembersSearchBar from "./TeamMembersSearchBar";
import TeamMembersList from "./TeamMembersList";

import { SearchBar } from "../../../types/searchBar.type";
import { searchBarSchema } from "../../../schemas/searchBar.schema";
import { useMembers } from "../hooks/useMembers";

export const PER_PAGE = 9;

type Props = {
  teamId: string;
};

export default function TeamMembers({ teamId }: Props) {
  const methods = useForm<SearchBar>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchBarSchema),
  });
  const {
    deleteMember,
    getMembers,
    members,
    pages,
    offset,
    isMembersLoading,
    isDeleteLoading,
    setMembers,
    setOffset,
  } = useMembers();

  return (
    <FormProvider {...methods}>
      <TeamMembersSearchBar
        teamId={teamId}
        getMembers={getMembers}
        setMembers={setMembers}
        setOffset={setOffset}
      />
      <TeamMembersList
        teamId={teamId}
        deleteMember={deleteMember}
        getMembers={getMembers}
        members={members}
        pages={pages}
        offset={offset}
        isMembersLoading={isMembersLoading}
        isDeleteLoading={isDeleteLoading}
        setOffset={setOffset}
      />
    </FormProvider>
  );
}
