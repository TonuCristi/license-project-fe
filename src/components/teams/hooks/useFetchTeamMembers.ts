import { useCallback, useState } from "react";

import { TeamsApi } from "../../../services/TeamsApi";
import { Employee } from "../../../types/employee.type";
import { mapEmployee } from "../../../utlis/mapEmployee";

export function useFetchTeamMembers() {
  const [members, setMembers] = useState<Employee[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getTeamMembers = useCallback(function (
    teamId: string,
    search: string,
    offset: string,
    perPage: string,
  ) {
    setIsLoading(true);
    TeamsApi.getTeamMembers(teamId, search, offset, perPage)
      .then((res) => {
        const members = res.members.map((member) => mapEmployee(member));
        setPages(res.pages);
        setMembers(members);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    getTeamMembers,
    members,
    pages,
    offset,
    isLoading,
    setMembers,
    setPages,
    setOffset,
    setIsLoading,
  };
}
