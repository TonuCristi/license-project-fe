import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";
import axios from "axios";

import { ProjectsContext } from "../../../contexts/ProjectsContext";
import { mapProject } from "../../../utlis/mapProject";
import { ProjectsApi } from "../../../services/ProjectsApi";
import { CreateProject, ProjectState } from "../../../types/project.type";
import { PER_PAGE } from "../../../constants/employees";

export function useCreateProject() {
  const { projects, offset, setProjects, setOffset } =
    useContext(ProjectsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getValues } = useFormContext();

  async function createProject(
    project: CreateProject,
    search: string,
    state: ProjectState,
  ) {
    setIsLoading(true);

    try {
      const createProjectRes = await ProjectsApi.createProject(project);
      const getPagesRes = await ProjectsApi.getProjectsPages(
        search,
        state,
        PER_PAGE,
      );

      if (getValues().state === "pending") {
        const newProject = mapProject(createProjectRes.newProject);
        const pages = getPagesRes;

        console.log(newProject);

        if (projects.length === 0) {
          setProjects([newProject]);
        }

        if (
          pages - 1 === offset &&
          projects.length >= 1 &&
          projects.length < 9
        ) {
          setProjects((prev) => [...prev, newProject]);
        }

        if (projects.length === 9) {
          setOffset(pages - 1);
        }
      }

      toast.success(createProjectRes.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }

    setIsLoading(false);
  }

  return { createProject, isLoading };
}
