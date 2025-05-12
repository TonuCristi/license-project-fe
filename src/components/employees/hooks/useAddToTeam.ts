import { useState } from "react";
import toast from "react-hot-toast";

import { TeamsApi } from "../../../services/TeamsApi";

export function useAddToTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addToTeam(teamId: string, employeesIds: string[]) {
    setIsLoading(true);
    TeamsApi.addToTeam(teamId, employeesIds)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { addToTeam, isLoading };
}
