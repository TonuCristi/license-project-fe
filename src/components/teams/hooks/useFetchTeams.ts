import { useCallback, useContext } from "react";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";
import { mapTeam } from "../../../utlis/mapTeam";

export function useFetchTeams() {
  const { setTeams, setPages, setIsLoading } = useContext(TeamsContext);

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
          const teams = res.teams.map((team) => mapTeam(team));
          setTeams(teams);
          setPages(res.pages);
        })
        .catch((error) => {
          if (error.name === "CanceledError") {
            return;
          }

          console.log(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    },
    [setTeams, setPages, setIsLoading],
  );

  return { getTeams };
}
