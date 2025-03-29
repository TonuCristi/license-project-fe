import { useCallback, useContext } from "react";

import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

export function useFetchAppointmentsFiltersData() {
  const {
    appointmentsYears,
    isAppointmentsFiltersDataLoading,
    setIsAppointmentsFiltersDataLoading,
    setAppointmentsYears,
  } = useContext(AppointmentsContext);

  // Get appointements filters data
  const getAppointmentsFiltersData = useCallback(
    function () {
      AppointmentsApi.getAppointmentsYears()
        .then((res) => setAppointmentsYears(res))
        .catch((error) => console.log(error))
        .finally(() => setIsAppointmentsFiltersDataLoading(false));
    },
    [setAppointmentsYears, setIsAppointmentsFiltersDataLoading],
  );

  return {
    appointmentsYears,
    isAppointmentsFiltersDataLoading,
    getAppointmentsFiltersData,
  };
}
