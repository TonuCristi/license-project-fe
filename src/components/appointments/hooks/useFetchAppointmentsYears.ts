import { useContext, useEffect, useState } from "react";

import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

export function useFetchAppointmentsYears() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { setAppointmentsYears } = useContext(AppointmentsContext);

  useEffect(() => {
    AppointmentsApi.getAppointmentsYears()
      .then((res) => setAppointmentsYears(res))
      .finally(() => setIsLoading(false));
  }, [setAppointmentsYears]);

  return {
    isLoading,
  };
}
