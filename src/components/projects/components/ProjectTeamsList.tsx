import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Pagination from "../../Pagination";
import ProjectTeamListItem from "./ProjectTeamListItem";

import { PER_PAGE } from "./ProjectTeams";
import { Team } from "../../../types/team.type";

type Props = {
  projectId: string;
  deleteProjectTeam: (projectTeamId: string, teamId: string) => void;
  getTeams: (
    projectId: string,
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  teams: Team[];
  pages: number;
  offset: number;
  isTeamsLoading: boolean;
  isDeleteLoading: boolean;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function ProjectTeamsList({
  projectId,
  deleteProjectTeam,
  getTeams,
  teams,
  pages,
  offset,
  isTeamsLoading,
  isDeleteLoading,
  setOffset,
}: Props) {
  const controllerRef = useRef<AbortController>();
  const { watch } = useFormContext();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    if (controllerRef.current) {
      getTeams(
        projectId,
        watch("search"),
        offset,
        PER_PAGE,
        controllerRef.current,
      );
    }
  }, [getTeams, watch, offset, projectId]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {teams.map((team) => (
          <ProjectTeamListItem
            key={team.id}
            deleteProjectTeam={deleteProjectTeam}
            team={team}
            isDeleteLoading={isDeleteLoading}
          />
        ))}
      </ul>
      {pages > 1 && (
        <Pagination
          isLoading={isTeamsLoading}
          pages={pages}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
