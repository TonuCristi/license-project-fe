import { useContext, useEffect } from "react";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";
import { mapTeam } from "../../../utlis/mapTeam";

export function useFetchTeams() {
  const { isTeamsLoading, setTeams, setIsTeamsLoading } =
    useContext(TeamsContext);

  useEffect(() => {
    TeamsApi.getTeams()
      .then((res) => {
        const teams = res.map((team) => mapTeam(team));

        setTeams(teams);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsTeamsLoading(false));
  }, [setTeams, setIsTeamsLoading]);

  return { isTeamsLoading };
}
