import { useState } from "react";
import toast from "react-hot-toast";

import { ChangePassword } from "../../../types/user.type";
import { UserApi } from "../../../services/UserApi";

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function changePasword(passwords: ChangePassword) {
    setIsLoading(true);
    UserApi.changePassword(passwords)
      .then((res) => toast.success(res))
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { changePasword, isLoading };
}
