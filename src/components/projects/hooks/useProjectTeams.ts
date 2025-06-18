import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { ProjectsApi } from "../../../services/ProjectsApi";
import { mapTeam } from "../../../utlis/mapTeam";
import { Team } from "../../../types/team.type";

export function useProjectTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isTeamsLoading, setIsTeamsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  function deleteProjectTeam(projectTeamId: string, teamId: string) {
    setIsDeleteLoading(true);
    ProjectsApi.deleteProjectTeam(projectTeamId)
      .then((res) => {
        if (teams.length === 1) {
          setTeams((prev) => [...prev.filter((teams) => teams.id !== teamId)]);
          setPages((prev) => prev - 1);
          setOffset(pages - 2 < 0 ? 0 : pages - 2);
        }

        if (teams.length > 1) {
          setTeams((prev) => [...prev.filter((teams) => teams.id !== teamId)]);
        }

        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsDeleteLoading(false));
  }

  const getTeams = useCallback(
    function (
      projectId: string,
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsTeamsLoading(true);
      ProjectsApi.getProjectTeams(
        projectId,
        search,
        offset,
        perPage,
        controller,
      )
        .then((res) => {
          const teams = res.teams.map((team) => mapTeam(team));

          setPages(res.pages);
          setTeams(teams);
        })
        .catch((error) => {
          if (error.name === "CanceledError") {
            return;
          }

          console.log(error.response.data.message);
        })
        .finally(() => setIsTeamsLoading(false));
    },
    [setTeams, setPages, setIsTeamsLoading],
  );

  return {
    deleteProjectTeam,
    getTeams,
    teams,
    pages,
    offset,
    isTeamsLoading,
    isDeleteLoading,
    setTeams,
    setOffset,
  };
}
