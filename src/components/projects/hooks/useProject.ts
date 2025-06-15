import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapProject } from "../../../utlis/mapProject";
import { Project, ProjectProgress } from "../../../types/project.type";

export function useProject() {
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
  const [isEditProgressLoading, setIsEditProgressLoading] =
    useState<boolean>(false);
  const { projectId } = useParams();

  function editProgress(projectId: string, progress: ProjectProgress) {
    setIsEditProgressLoading(true);
    ProjectsApi.editProjectProgress(projectId, progress)
      .then((res) => {
        setProject((prev) => ({ ...prev, progress: res.editedProgress }));
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsEditProgressLoading(false));
  }

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

  return { editProgress, project, isLoading, isEditProgressLoading };
}
