import { useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { useFetchTeamMembers } from "../hooks/useFetchTeamMembers";
import { PER_PAGE } from "./SelectedTeamMembers";

export default function TeamMembersSearchBar() {
  const { selectedTeam } = useContext(TeamsContext);
  const methods = useFormContext();

  const { getTeamMembers } = useFetchTeamMembers();

  const { watch } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (selectedTeam) {
        getTeamMembers(selectedTeam.id, search, 0, PER_PAGE);
      }
    });

    return () => unsubscribe();
  }, [watch, getTeamMembers, selectedTeam]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search employees..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
