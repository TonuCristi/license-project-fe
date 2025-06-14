import { useCallback, useContext } from "react";

import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapProject } from "../../../utlis/mapProject";

export function useFetchProjects() {
  const { isLoading, setProjects, setPages, setIsLoading } =
    useContext(ProjectsContext);

  const getProjects = useCallback(
    function (search: string, offset: number, perPage: number) {
      setIsLoading(true);
      ProjectsApi.getProjects(search, offset, perPage)
        .then((res) => {
          const projects = res.projects.map((project) => mapProject(project));
          setPages(res.pages);
          setProjects(projects);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    },
    [setProjects, setPages, setIsLoading],
  );

  return { getProjects, isLoading };
}
