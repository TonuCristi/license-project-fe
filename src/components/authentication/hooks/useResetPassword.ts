import { useState } from "react";
import toast from "react-hot-toast";

import { AuthApi } from "../../../services/AuthApi";
import { ResetPassword } from "../../../types/user.type";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function resetPassword(
    token: string,
    passwords: ResetPassword,
    cb: () => void,
  ) {
    setIsLoading(true);
    AuthApi.resetPassword(token, passwords)
      .then((res) => {
        cb();
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { resetPassword, isLoading };
}
