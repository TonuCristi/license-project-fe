import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";

export function useDeleteMember() {
  const { members, pages, setMembers, setPages, setOffset } =
    useContext(TeamsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteMember(memberId: string, employeeId: string) {
    setIsLoading(true);
    TeamsApi.deleteMember(memberId)
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
      .finally(() => setIsLoading(false));
  }

  return { deleteMember, isLoading };
}
