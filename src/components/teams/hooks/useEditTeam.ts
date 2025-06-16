import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";
import { EditTeam } from "../../../types/team.type";
import { mapTeam } from "../../../utlis/mapTeam";

export function useEditTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTeams } = useContext(TeamsContext);

  function editTeam(teamId: string, newEditedTeam: EditTeam) {
    setIsLoading(true);
    TeamsApi.editTeam(teamId, newEditedTeam)
      .then((res) => {
        const editedTeam = mapTeam(res.editedTeam);

        setTeams((prev) => {
          const editedTeamIndex = prev.findIndex((team) => team.id === teamId);

          const firstHalf = prev.slice(0, editedTeamIndex);
          const secondHalf = prev.slice(editedTeamIndex + 1, prev.length);

          return [...firstHalf, editedTeam, ...secondHalf];
        });
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editTeam, isLoading };
}
