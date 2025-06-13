import { useState } from "react";
import toast from "react-hot-toast";

import { CreateTeam } from "../../../types/team.type";
import { TeamsApi } from "../../../services/TeamsApi";

export function useCreateTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createTeam(team: CreateTeam) {
    setIsLoading(true);
    TeamsApi.createTeam(team)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createTeam, isLoading };
}
