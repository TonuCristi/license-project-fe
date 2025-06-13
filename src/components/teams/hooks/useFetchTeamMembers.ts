import { useCallback, useContext } from "react";

import { TeamsApi } from "../../../services/TeamsApi";
import { mapEmployee } from "../../../utlis/mapEmployee";
import { TeamsContext } from "../../../contexts/TeamsContext";

export function useFetchTeamMembers() {
  const { setMembers, setPages, setIsMembersLoading } =
    useContext(TeamsContext);

  const getTeamMembers = useCallback(
    function (teamId: string, search: string, offset: number, perPage: number) {
      setIsMembersLoading(true);
      TeamsApi.getTeamMembers(teamId, search, offset, perPage)
        .then((res) => {
          const members = res.members.map((member) => mapEmployee(member));
          setPages(res.pages);
          setMembers(members);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsMembersLoading(false));
    },
    [setMembers, setPages, setIsMembersLoading],
  );

  return {
    getTeamMembers,
  };
}
