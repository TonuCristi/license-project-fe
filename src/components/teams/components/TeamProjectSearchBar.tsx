import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { Project } from "../../../types/project.type";

type Props = {
  getProjects: (
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function TeamProjectSearchBar({
  getProjects,
  setProjects,
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
      setProjects([]);
      if (controllerRef.current) {
        getProjects(search, 0, 5, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getProjects, setProjects, setOffset]);

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
