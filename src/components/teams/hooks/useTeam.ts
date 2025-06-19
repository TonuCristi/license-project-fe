import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import { EditTeam, TeamWithoutProjectTeamId } from "../../../types/team.type";
import { TeamsApi } from "../../../services/TeamsApi";
import { mapTeam } from "../../../utlis/mapTeam";

export function useTeam() {
  const [team, setTeam] = useState<TeamWithoutProjectTeamId>({
    id: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const { teamId } = useParams();
  const navigate = useNavigate();

  function editTeam(teamId: string, newEditedTeam: EditTeam) {
    setIsEditLoading(true);
    TeamsApi.editTeam(teamId, newEditedTeam)
      .then((res) => {
        const editedTeam = mapTeam(res.editedTeam);
        setTeam(editedTeam);
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsEditLoading(false));
  }

  function deleteTeam(teamId: string) {
    setIsDeleteLoading(true);
    TeamsApi.deleteTeam(teamId)
      .then((res) => {
        navigate("/teams");
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsDeleteLoading(false));
  }

  useEffect(() => {
    if (teamId) {
      TeamsApi.getTeam(teamId)
        .then((res) => {
          const team = mapTeam(res);
          setTeam(team);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    }
  }, [teamId]);

  return {
    editTeam,
    deleteTeam,
    team,
    isLoading,
    isEditLoading,
    isDeleteLoading,
  };
}
