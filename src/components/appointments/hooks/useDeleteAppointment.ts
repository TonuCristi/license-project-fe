import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useDeleteAppointment() {
  const { appointments, filters, setAppointments, setAppointmentsYears } =
    useContext(AppointmentsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteAppointment(appointmentId: string) {
    setIsLoading(true);
    AppointmentsApi.deleteAppointment(appointmentId)
      .then((res) => {
        const deletedAppointment = mapAppointment(res.deletedAppointment);

        const deletedAppointmentYear = new Date(
          deletedAppointment.startTime,
        ).getFullYear();

        if (
          appointments.length === 1 &&
          appointments.find(
            (appointment) =>
              new Date(appointment.startTime).getFullYear() ===
              deletedAppointmentYear,
          )
        ) {
          setAppointmentsYears((prev) => [
            ...prev.filter((year) => year != deletedAppointmentYear),
          ]);
        }

        if (+filters.year === deletedAppointmentYear) {
          setAppointments((prev) => [
            ...prev.filter(
              (appointment) => appointment.id !== deletedAppointment.id,
            ),
          ]);
        }

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteAppointment, isLoading };
}
