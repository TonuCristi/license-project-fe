import { useState } from "react";
import toast from "react-hot-toast";
import { ProjectsApi } from "../../../services/ProjectsApi";

export function useAddToProject() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addToProject(projectId: string, teamId: string) {
    setIsLoading(true);
    ProjectsApi.addToProject(projectId, teamId)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { addToProject, isLoading };
}
