import { useCallback, useContext } from "react";

import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapProject } from "../../../utlis/mapProject";

export function useFetchProjects() {
  const { setProjects, setPages, setIsLoading } = useContext(ProjectsContext);

  const getProjects = useCallback(
    function (
      search: string,
      state: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsLoading(true);
      ProjectsApi.getProjects(search, state, offset, perPage, controller)
        .then((res) => {
          const projects = res.projects.map((project) => mapProject(project));
          setPages(res.pages);
          setProjects(projects);
        })
        .catch((error) => {
          if (error.name === "CanceledError") {
            return;
          }

          console.log(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    },
    [setProjects, setPages, setIsLoading],
  );

  return { getProjects };
}
