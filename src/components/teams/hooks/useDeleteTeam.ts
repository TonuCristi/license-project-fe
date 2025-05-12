import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsApi } from "../../../services/TeamsApi";
import { TeamsContext } from "../../../contexts/TeamsContext";

export function useDeleteTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedTeam, setSelectedTeam, setTeams, setMembers } =
    useContext(TeamsContext);

  function deleteTeam() {
    if (!selectedTeam) {
      return;
    }

    setIsLoading(true);
    TeamsApi.deleteTeam(selectedTeam.id)
      .then((res) => {
        setTeams((prev) => [
          ...prev.filter((team) => team.id !== selectedTeam.id),
        ]);
        setSelectedTeam(null);
        setMembers([]);

        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.mesasge))
      .finally(() => setIsLoading(false));
  }

  return { deleteTeam, isLoading };
}
