import { useContext } from "react";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useFetchAppointments() {
  const { setAppointments, setFilters, setIsLoading } =
    useContext(AppointmentsContext);

  function getAppointments(year?: string, month?: string, day?: string) {
    if (!year) {
      return setAppointments([]);
    }

    setIsLoading(true);
    AppointmentsApi.getAppointments(year, month, day)
      .then((res) => {
        const mappedAppointments = res.map((appointment) =>
          mapAppointment(appointment),
        );

        setFilters({
          year: year,
          month: month === undefined ? "" : month,
          day: day === undefined ? "" : day,
        });
        setAppointments(mappedAppointments);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { getAppointments };
}
