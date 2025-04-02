import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { UserApi } from "../services/UserApi";
import { UserContext } from "../contexts/UserContext";
import { mapUser } from "../utlis/mapUser";

export function useFetchLoggedUser() {
  const { isLoading, setUser, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    UserApi.getLoggedUser()
      .then((res) => {
        const user = mapUser(res);
        setUser(user);
      })
      .catch((error) => toast.error(error.data.response.message))
      .finally(() => setIsLoading(false));
  }, [setUser, setIsLoading]);

  return { isLoading };
}
