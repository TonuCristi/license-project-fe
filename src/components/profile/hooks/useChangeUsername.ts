import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { UserApi } from "../../../services/UserApi";
import { UserContext } from "../../../contexts/UserContext";

export function useChangeUsername() {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  function changeUsername(username: string) {
    setisLoading(true);
    UserApi.changeUsername(username)
      .then((res) => {
        setUser((prev) =>
          prev ? { ...prev, username: res.newUsername } : null,
        );
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setisLoading(false));
  }

  return { changeUsername, isLoading };
}
