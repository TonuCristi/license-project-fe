import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsApi } from "../../../services/TeamsApi";
import { TeamsContext } from "../../../contexts/TeamsContext";

export function useDeleteTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { teams, pages, setTeams, setPages, setOffset } =
    useContext(TeamsContext);

  function deleteTeam(teamId: string) {
    setIsLoading(true);
    TeamsApi.deleteTeam(teamId)
      .then((res) => {
        if (teams.length === 1) {
          setTeams((prev) => [...prev.filter((team) => team.id !== teamId)]);
          setPages((prev) => prev - 1);
          setOffset(pages - 2 < 0 ? 0 : pages - 2);
        }

        if (teams.length > 1) {
          setTeams((prev) => [...prev.filter((team) => team.id !== teamId)]);
        }

        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.mesasge))
      .finally(() => setIsLoading(false));
  }

  return { deleteTeam, isLoading };
}
