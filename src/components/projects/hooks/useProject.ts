import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapProject } from "../../../utlis/mapProject";
import {
  EditProject,
  Project,
  ProjectProgress,
  ProjectState,
} from "../../../types/project.type";

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
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isEditProgressLoading, setIsEditProgressLoading] =
    useState<boolean>(false);
  const [isEditStateLoading, setIsEditStateLoading] = useState<boolean>(false);
  const { projectId } = useParams();

  function editProject(projectId: string, newEditedProject: EditProject) {
    setIsEditLoading(true);
    ProjectsApi.editProject(projectId, newEditedProject)
      .then((res) => {
        const editedProject = mapProject(res.editedProject);
        setProject(editedProject);
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsEditLoading(false));
  }

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

  function editState(projectId: string, state: ProjectState, cb: () => void) {
    setIsEditStateLoading(true);
    ProjectsApi.editProjectState(projectId, state)
      .then((res) => {
        setProject((prev) => ({ ...prev, state: res.editedState }));
        cb();
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsEditStateLoading(false));
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

  return {
    editProject,
    editProgress,
    editState,
    project,
    isLoading,
    isEditLoading,
    isEditProgressLoading,
    isEditStateLoading,
  };
}
