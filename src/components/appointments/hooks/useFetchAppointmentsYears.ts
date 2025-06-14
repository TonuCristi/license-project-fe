import { useContext, useEffect, useState } from "react";

import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

export function useFetchAppointmentsYears(state: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setAppointmentsYears } = useContext(AppointmentsContext);

  useEffect(() => {
    AppointmentsApi.getAppointmentsYears(state)
      .then((res) => setAppointmentsYears(res))
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [setAppointmentsYears, state]);

  return {
    isLoading,
  };
}
