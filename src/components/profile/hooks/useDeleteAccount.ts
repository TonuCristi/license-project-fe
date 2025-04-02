import { useState } from "react";
import toast from "react-hot-toast";

import { UserApi } from "../../../services/UserApi";
import { useLogout } from "../../../hooks/useLogout";

export function useDeleteAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useLogout();

  function deleteAccount() {
    setIsLoading(true);
    UserApi.deleteAccount()
      .then(() => logout())
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteAccount, isLoading };
}
