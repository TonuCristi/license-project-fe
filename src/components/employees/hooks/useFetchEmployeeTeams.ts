import { useCallback, useState } from "react";

import { TeamsApi } from "../../../services/TeamsApi";
import { mapTeam } from "../../../utlis/mapTeam";
import { Team } from "../../../types/team.type";

export function useFetchEmployeeTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTeams = useCallback(
    function (
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsLoading(true);
      TeamsApi.getTeams(search, offset, perPage, controller)
        .then((res) => {
          const teams = res.map((team) => mapTeam(team));

          setTeams((prev) => [...prev, ...teams]);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    },
    [setTeams, setIsLoading],
  );

  return { getTeams, teams, isLoading, setTeams };
}
