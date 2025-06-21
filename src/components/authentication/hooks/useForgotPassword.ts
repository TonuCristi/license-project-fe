import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { AuthApi } from "../../../services/AuthApi";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function forgotPassword(email: string) {
    setIsLoading(true);
    AuthApi.forgotPassword(email)
      .then((res) => {
        navigate("/reset-password");
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { forgotPassword, isLoading };
}
