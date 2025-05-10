import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Team } from "../types/team.type";
import { Employee } from "../types/employee.type";

type TeamsContext = {
  teams: Team[];
  selectedTeam: Team | null;
  members: Employee[];
  pages: number;
  offset: number;
  isTeamsLoading: boolean;
  isMembersLoading: boolean;
  setTeams: Dispatch<SetStateAction<Team[]>>;
  setMembers: Dispatch<SetStateAction<Employee[]>>;
  setPages: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setSelectedTeam: Dispatch<SetStateAction<Team | null>>;
  setIsTeamsLoading: Dispatch<SetStateAction<boolean>>;
  setIsMembersLoading: Dispatch<SetStateAction<boolean>>;
};

export const TeamsContext = createContext<TeamsContext>({
  teams: [],
  selectedTeam: null,
  members: [],
  pages: 0,
  offset: 0,
  isTeamsLoading: true,
  isMembersLoading: false,
  setTeams: () => undefined,
  setMembers: () => undefined,
  setPages: () => undefined,
  setOffset: () => undefined,
  setSelectedTeam: () => undefined,
  setIsTeamsLoading: () => undefined,
  setIsMembersLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function TeamsProvider({ children }: Props) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isTeamsLoading, setIsTeamsLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<Employee[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isMembersLoading, setIsMembersLoading] = useState<boolean>(false);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        selectedTeam,
        members,
        pages,
        offset,
        isTeamsLoading,
        isMembersLoading,
        setTeams,
        setMembers,
        setPages,
        setOffset,
        setSelectedTeam,
        setIsTeamsLoading,
        setIsMembersLoading,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
