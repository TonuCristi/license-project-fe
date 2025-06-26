import { useState } from "react";
import toast from "react-hot-toast";

import { AuthApi } from "../../../services/AuthApi";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function forgotPassword(email: string) {
    setIsLoading(true);
    AuthApi.forgotPassword(email)
      .then((res) => {
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { forgotPassword, isLoading };
}
