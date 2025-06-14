import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Project } from "../types/project.type";

type ProjectsContext = {
  projects: Project[];
  pages: number;
  offset: number;
  isLoading: boolean;
  setProjects: Dispatch<SetStateAction<Project[]>>;
  setPages: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ProjectsContext = createContext<ProjectsContext>({
  projects: [],
  pages: 0,
  offset: 0,
  isLoading: false,
  setProjects: () => undefined,
  setPages: () => undefined,
  setOffset: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function ProjectsProvider({ children }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        pages,
        offset,
        isLoading,
        setProjects,
        setPages,
        setOffset,
        setIsLoading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
