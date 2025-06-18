import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { CreateTeam } from "../../../types/team.type";
import { TeamsApi } from "../../../services/TeamsApi";
import { PER_PAGE } from "../../../pages/TeamsPage";
import { mapTeam } from "../../../utlis/mapTeam";

export function useCreateTeam() {
  const { teams, offset, setTeams, setOffset } = useContext(TeamsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function createTeam(team: CreateTeam, search: string) {
    setIsLoading(true);

    try {
      const createTeamRes = await TeamsApi.createTeam(team);
      const getPagesRes = await TeamsApi.getTeamsPages(search, PER_PAGE);

      const newTeam = mapTeam(createTeamRes.newTeam);
      const pages = getPagesRes;

      if (teams.length === 0) {
        setTeams([{ ...newTeam }]);
      }

      if (pages - 1 === offset && teams.length >= 1 && teams.length < 9) {
        setTeams((prev) => [...prev, { ...newTeam }]);
      }

      if (teams.length === 9) {
        setOffset(pages - 1);
      }

      toast.success(createTeamRes.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }

    setIsLoading(false);
  }

  return { createTeam, isLoading };
}
