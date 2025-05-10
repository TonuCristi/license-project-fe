import { useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TeamsContext } from "../../../contexts/TeamsContext";

type Props = {
  getTeamMembers: (
    teamId: string,
    search: string,
    offset: string,
    perPage: string,
  ) => void;
};

export default function TeamMembersSearchBar({ getTeamMembers }: Props) {
  const { selectedTeam } = useContext(TeamsContext);
  const methods = useFormContext();

  const { watch } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(({ value }) => {
      if (selectedTeam) {
        getTeamMembers(selectedTeam.id, value, "0", "9");
      }
    });

    return () => unsubscribe();
  }, [watch, getTeamMembers, selectedTeam]);

  return (
    <form className="w-full">
      <Input
        name="value"
        placeholder="Search employees..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
