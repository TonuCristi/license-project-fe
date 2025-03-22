import { useEffect, useState } from "react";

import { Appointments } from "../../../types/appointment.type";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointments>({
    year: null,
    appointmentsPerMonths: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function getAppointments(year?: number, month?: number, day?: number) {
    AppointmentsApi.getAppointments(year, month, day)
      .then((res) => {
        const mappedAppointments = res.appointmentsPerMonths.map(
          (appointmentsPerMonth) => ({
            ...appointmentsPerMonth,
            appointments: appointmentsPerMonth.appointments.map((appointment) =>
              mapAppointment(appointment),
            ),
          }),
        );

        setAppointments({ ...res, appointmentsPerMonths: mappedAppointments });
      })
      .catch((error) => console.log(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getAppointments(2025);
  }, []);

  return { appointments, isLoading };
}
