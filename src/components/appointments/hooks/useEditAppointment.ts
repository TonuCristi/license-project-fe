import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useFormContext } from "react-hook-form";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { EditAppointment } from "../../../types/appointment.type";
import { AppointmentsApi } from "../../../services/AppointmentsApi";
import { mapAppointment } from "../../../utlis/mapAppointment";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function useEditAppointment() {
  const { setAppointments, setAppointmentsYears } =
    useContext(AppointmentsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getValues } = useFormContext();

  function editAppointment(
    appointmentId: string,
    newEditedAppointment: EditAppointment,
  ) {
    setIsLoading(true);
    AppointmentsApi.editAppointment(appointmentId, newEditedAppointment)
      .then((res) => {
        const editedAppointment = mapAppointment(res.editedAppointment);

        const editedAppointmentYear = new Date(
          editedAppointment.startTime,
        ).getFullYear();
        const filterYear = +getValues().year;
        const editedAppointmentMonth =
          months[new Date(editedAppointment.startTime).getMonth()];
        const filterMonth = months[+getValues().month];

        // Deletes the meeting if the edited appointment year is not the same as the filter year
        if (editedAppointmentYear !== filterYear) {
          setAppointments((prev) => [
            ...prev.filter(
              (appointment) => appointment.id !== editedAppointment.id,
            ),
          ]);

          setAppointmentsYears((prev) => {
            if (prev.includes(editedAppointmentYear)) return prev;

            return [...prev, editedAppointmentYear].sort((a, b) => a - b);
          });

          return toast.success(res.message);
        }

        // Deletes the appointment if the edited appointment month is not the same as the filter month
        if (getValues().month && editedAppointmentMonth !== filterMonth) {
          setAppointments((prev) => [
            ...prev.filter((meeting) => meeting.id !== editedAppointment.id),
          ]);

          return toast.success(res.message);
        }

        // Replaces the old appointment with the edited appointment
        setAppointments((prev) => [
          ...prev.filter(
            (appointment) => appointment.id !== editedAppointment.id,
          ),
          editedAppointment,
        ]);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editAppointment, isLoading };
}
