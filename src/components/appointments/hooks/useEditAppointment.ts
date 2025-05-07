import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { EditAppointment } from "../../../types/appointment.type";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

export function useEditAppointment() {
  const {
    appointments,
    filters,
    appointmentsYears,
    setAppointments,
    setAppointmentsYears,
  } = useContext(AppointmentsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function editAppointment(
    appointmentId: string,
    newEditedAppointment: EditAppointment,
  ) {
    setIsLoading(true);
    AppointmentsApi.editAppointment(appointmentId, newEditedAppointment)
      .then((res) => {
        const editedAppointment = mapAppointment(res.editedAppointment);
        const oldAppointment = mapAppointment(res.oldAppointment);

        const editedAppointmentYear = new Date(
          editedAppointment.startTime,
        ).getFullYear();
        const oldAppointmentYear = new Date(
          oldAppointment.startTime,
        ).getFullYear();

        if (!appointmentsYears.includes(editedAppointmentYear)) {
          setAppointmentsYears((prev) =>
            [...prev, editedAppointmentYear].sort((a, b) => a - b),
          );
        }

        if (
          appointments.length === 1 &&
          appointments.find(
            (appointment) =>
              new Date(appointment.startTime).getFullYear() ===
              oldAppointmentYear,
          )
        ) {
          setAppointmentsYears((prev) => [
            ...prev.filter((year) => year != oldAppointmentYear),
          ]);
        }

        if (+filters.year === editedAppointmentYear) {
          setAppointments((prev) => [
            ...prev.filter(
              (appointment) => appointment.id !== editedAppointment.id,
            ),
            editedAppointment,
          ]);
        }

        if (+filters.year !== editedAppointmentYear) {
          setAppointments((prev) => [
            ...prev.filter(
              (appointment) => appointment.id !== editedAppointment.id,
            ),
          ]);
        }

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editAppointment, isLoading };
}
