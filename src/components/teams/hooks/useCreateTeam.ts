import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { CreateTeam } from "../../../types/team.type";
import { TeamsApi } from "../../../services/TeamsApi";
import { mapTeam } from "../../../utlis/mapTeam";
import { TeamsContext } from "../../../contexts/TeamsContext";

export function useCreateTeam() {
  const { setTeams } = useContext(TeamsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createTeam(team: CreateTeam) {
    setIsLoading(true);
    TeamsApi.createTeam(team)
      .then((res) => {
        // const newTeam = mapTeam(res.newTeam);

        // setTeams((prev) => [...prev, newTeam]);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createTeam, isLoading };
}
