import { useContext, useEffect, useState } from "react";

import { NotificationsContext } from "../../../contexts/NotificationsContext";
import { NotificationsApi } from "../../../services/NotificationsApi";

export function useFetchNotificationsCount() {
  const { setNotificationsCount } = useContext(NotificationsContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    NotificationsApi.getNotificationsCount()
      .then((res) => {
        setNotificationsCount(res);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [setNotificationsCount]);

  return { isLoading };
}
