import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";
import { EditTeam } from "../../../types/team.type";
import { mapTeam } from "../../../utlis/mapTeam";

export function useEditTeam() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedTeam, setSelectedTeam, setTeams } = useContext(TeamsContext);

  function editTeam(newEditedTeam: EditTeam) {
    if (!selectedTeam) {
      return;
    }

    setIsLoading(true);
    TeamsApi.editTeam(selectedTeam.id, newEditedTeam)
      .then((res) => {
        const editedTeam = mapTeam(res.editedTeam);
        setSelectedTeam(editedTeam);
        setTeams((prev) => {
          const teamIndex = prev.findIndex(
            (team) => team.id === selectedTeam.id,
          );
          const firstHalf = prev.slice(0, teamIndex);
          const secondHalf = prev.slice(teamIndex + 1, prev.length);

          return [...firstHalf, editedTeam, ...secondHalf];
        });
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editTeam, isLoading };
}
