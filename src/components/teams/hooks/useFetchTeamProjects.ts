import { useCallback, useState } from "react";

import { ProjectsApi } from "../../../services/ProjectsApi";
import { Project } from "../../../types/project.type";
import { mapProject } from "../../../utlis/mapProject";

export function useFetchTeamProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProjects = useCallback(
    function (
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsLoading(true);
      ProjectsApi.getTeamProjects(search, offset, perPage, controller)
        .then((res) => {
          const projects = res.projects.map((project) => mapProject(project));

          setProjects((prev) => [...prev, ...projects]);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    },
    [setProjects, setIsLoading],
  );

  return { getProjects, projects, isLoading, setProjects };
}
