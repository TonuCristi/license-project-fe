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
  isLoading: boolean;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const TeamsContext = createContext<TeamsContext>({
  teams: [],
  isLoading: true,
  setTeams: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function TeamsProvider({ children }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <TeamsContext.Provider value={{ teams, isLoading, setTeams, setIsLoading }}>
      {children}
    </TeamsContext.Provider>
  );
}
