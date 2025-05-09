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
  selectedTeam: Team | null;
  isLoading: boolean;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setSelectedTeam: Dispatch<SetStateAction<Team | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const TeamsContext = createContext<TeamsContext>({
  teams: [],
  selectedTeam: null,
  isLoading: true,
  setTeams: () => undefined,
  setSelectedTeam: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function TeamsProvider({ children }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        selectedTeam,
        isLoading,
        setTeams,
        setSelectedTeam,
        setIsLoading,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
