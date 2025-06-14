import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { Team } from "../../../types/team.type";

type Props = {
  getTeams: (
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function EmployeeTeamSearchBar({
  getTeams,
  setTeams,
  setOffset,
}: Props) {
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(1);
      setTeams([]);
      if (controllerRef.current) {
        getTeams(search, 0, 5, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getTeams, setTeams, setOffset]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search your team..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
