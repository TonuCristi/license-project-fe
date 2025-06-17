import { useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Pagination from "../../Pagination";
import ProjectListItem from "./ProjectListItem";

import { useFetchProjects } from "../hooks/useFetchProjects";
import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { PER_PAGE } from "../../../pages/ProjectsPage";

export default function ProjectsList() {
  const { projects, pages, offset, isLoading, setOffset } =
    useContext(ProjectsContext);
  const { watch } = useFormContext();
  const { getProjects } = useFetchProjects();
  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    if (controllerRef.current) {
      getProjects(
        watch("search"),
        watch("state"),
        offset,
        PER_PAGE,
        controllerRef.current,
      );
    }
  }, [getProjects, offset, watch]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {projects.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </ul>
      {pages > 1 && (
        <Pagination
          isLoading={isLoading}
          pages={pages}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
