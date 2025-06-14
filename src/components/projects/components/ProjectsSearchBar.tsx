import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchProjects } from "../hooks/useFetchProjects";
import { PER_PAGE } from "../../../pages/ProjectsPage";

export default function ProjectsSearchBar() {
  const { getProjects } = useFetchProjects();
  const methods = useFormContext();

  const { watch } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(({ search, state }) => {
      getProjects(search, state, 0, PER_PAGE);
    });

    return () => unsubscribe();
  }, [watch, getProjects]);

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
