import { useFormContext } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { Team } from "../../../types/team.type";
import { PER_PAGE } from "../../../constants/teams";

type Props = {
  projectId: string;
  getTeams: (
    projectId: string,
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function ProjectTeamsSearchBar({
  projectId,
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

      setOffset(0);
      setTeams([]);
      if (controllerRef.current) {
        getTeams(projectId, search, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [getTeams, setOffset, setTeams, watch, projectId]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search teams..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
