import { useContext, useEffect } from "react";

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
      .finally(() => setIsLoading(false));
  }, [setUser, setIsLoading]);

  return { isLoading };
}
