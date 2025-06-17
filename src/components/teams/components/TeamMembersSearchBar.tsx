import { useFormContext } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { PER_PAGE } from "./TeamMembers";
import { Employee } from "../../../types/employee.type";

type Props = {
  teamId: string;
  getMembers: (
    teamId: string,
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  setMembers: Dispatch<SetStateAction<Employee[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function TeamMembersSearchBar({
  teamId,
  getMembers,
  setMembers,
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
      setMembers([]);
      if (controllerRef.current) {
        getMembers(teamId, search, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [getMembers, setOffset, setMembers, watch, teamId]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search members..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
