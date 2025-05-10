import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { TeamsApi } from "../../../services/TeamsApi";

export function useDeleteMember() {
  const { setMembers } = useContext(TeamsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteMember(memberId: string, employeeId: string) {
    setIsLoading(true);
    TeamsApi.deleteMember(memberId)
      .then((res) => {
        setMembers((prev) => [
          ...prev.filter((member) => member.id !== employeeId),
        ]);
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteMember, isLoading };
}
