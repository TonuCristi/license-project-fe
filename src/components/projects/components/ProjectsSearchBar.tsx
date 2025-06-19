import { useFormContext } from "react-hook-form";
import { useContext, useEffect, useRef } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchProjects } from "../hooks/useFetchProjects";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { PER_PAGE } from "../../../constants/projects";

export default function ProjectsSearchBar() {
  const { setProjects, setOffset } = useContext(ProjectsContext);
  const { getProjects } = useFetchProjects();
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search, state }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(0);
      setProjects([]);
      if (controllerRef.current) {
        getProjects(search, state, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getProjects, setProjects, setOffset]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search projects..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
