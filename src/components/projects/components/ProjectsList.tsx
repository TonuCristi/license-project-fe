import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Pagination from "../../Pagination";
import ProjectListItem from "./ProjectListItem";

import { PER_PAGE } from "../../../pages/EmployeesPage";
import { useFetchProjects } from "../hooks/useFetchProjects";
import { ProjectsContext } from "../../../contexts/ProjectsContext";

export default function ProjectsList() {
  const { projects, pages, offset, isLoading, setOffset } =
    useContext(ProjectsContext);
  const methods = useFormContext();
  const { getProjects } = useFetchProjects();

  const { watch } = methods;

  useEffect(() => {
    getProjects(watch("search"), offset, PER_PAGE);
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
