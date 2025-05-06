import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { CreateAppointment } from "../../../types/appointment.type";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useCreateAppointment() {
  const { filters, appointmentsYears, setAppointments, setAppointmentsYears } =
    useContext(AppointmentsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createAppointment(appointment: CreateAppointment) {
    setIsLoading(true);
    AppointmentsApi.createAppointment(appointment)
      .then((res) => {
        const newAppointment = mapAppointment(res.newAppointment);

        const newAppointmentYear = new Date(
          newAppointment.startTime,
        ).getFullYear();

        if (!appointmentsYears.includes(newAppointmentYear)) {
          setAppointmentsYears((prev) =>
            [...prev, newAppointmentYear].sort((a, b) => a - b),
          );
        }

        if (+filters.year === newAppointmentYear) {
          setAppointments((prev) => [...prev, newAppointment]);
        }

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createAppointment, isLoading };
}
