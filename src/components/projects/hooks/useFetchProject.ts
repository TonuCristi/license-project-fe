import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapProject } from "../../../utlis/mapProject";
import { Project } from "../../../types/project.type";

export function useFetchProject() {
  const [project, setProject] = useState<Project>({
    id: "",
    name: "",
    description: "",
    startDate: "",
    deadline: "",
    state: "pending",
    progress: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      ProjectsApi.getProject(projectId)
        .then((res) => {
          const project = mapProject(res);
          setProject(project);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    }
  }, [projectId]);

  return { project, isLoading };
}
