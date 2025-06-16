import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Team } from "../types/team.type";

type TeamsContext = {
  teams: Team[];
  pages: number;
  offset: number;
  isLoading: boolean;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setPages: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const TeamsContext = createContext<TeamsContext>({
  teams: [],
  pages: 0,
  offset: 0,
  isLoading: false,
  setTeams: () => undefined,
  setPages: () => undefined,
  setOffset: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function TeamsProvider({ children }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        pages,
        offset,
        isLoading,
        setTeams,
        setPages,
        setOffset,
        setIsLoading,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
