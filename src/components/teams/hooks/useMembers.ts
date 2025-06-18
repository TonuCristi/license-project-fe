import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { TeamsApi } from "../../../services/TeamsApi";
import { mapEmployee } from "../../../utlis/mapEmployee";
import { Employee } from "../../../types/employee.type";

export function useMembers() {
  const [members, setMembers] = useState<Employee[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isMembersLoading, setIsMembersLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  function deleteMember(membershipId: string, employeeId: string) {
    setIsDeleteLoading(true);
    TeamsApi.deleteMember(membershipId)
      .then((res) => {
        if (members.length === 1) {
          setMembers((prev) => [
            ...prev.filter((members) => members.id !== employeeId),
          ]);
          setPages((prev) => prev - 1);
          setOffset(pages - 2 < 0 ? 0 : pages - 2);
        }

        if (members.length > 1) {
          setMembers((prev) => [
            ...prev.filter((members) => members.id !== employeeId),
          ]);
        }

        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsDeleteLoading(false));
  }

  const getMembers = useCallback(
    function (
      teamId: string,
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsMembersLoading(true);
      TeamsApi.getTeamMembers(teamId, search, offset, perPage, controller)
        .then((res) => {
          const members = res.members.map((member) => mapEmployee(member));
          setPages(res.pages);
          setMembers(members);
        })
        .catch((error) => {
          if (error.name === "CanceledError") {
            return;
          }

          console.log(error.response.data.message);
        })
        .finally(() => setIsMembersLoading(false));
    },
    [setMembers, setPages, setIsMembersLoading],
  );

  return {
    deleteMember,
    getMembers,
    members,
    pages,
    offset,
    isMembersLoading,
    isDeleteLoading,
    setMembers,
    setOffset,
  };
}
