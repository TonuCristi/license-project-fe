import { useContext } from "react";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useFetchAppointments() {
  const { setAppointments, setIsLoading } = useContext(AppointmentsContext);

  function getAppointments(
    appointmentState: string,
    year: string,
    month: string,
    day: string,
  ) {
    setIsLoading(true);
    AppointmentsApi.getAppointments(appointmentState, year, month, day)
      .then((res) => {
        const mappedAppointments = res.map((appointment) =>
          mapAppointment(appointment),
        );

        setAppointments(mappedAppointments);
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { getAppointments };
}
