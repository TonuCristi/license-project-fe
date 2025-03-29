import { useContext } from "react";

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
  const { isLoading, setAppointments, setIsLoading } =
    useContext(AppointmentsContext);

  // Edits an appointment
  function editAppointment(
    appointmentId: string,
    newEditedAppointment: EditAppointment,
  ) {
    setIsLoading(true);
    AppointmentsApi.editAppointment(appointmentId, newEditedAppointment)
      .then((res) => {
        const editedAppointment = mapAppointment(res.editedAppointment);
        const oldAppointment = mapAppointment(res.oldAppointment);

        const editedAppointmentMonth =
          months[new Date(editedAppointment.startTime).getMonth()];

        const oldAppointmentMonth =
          months[new Date(oldAppointment.startTime).getMonth()];

        setAppointments((prev) => {
          const appointmentsPerMonths = prev.appointmentsPerMonths;

          const editedAppointmentMonthIndex = appointmentsPerMonths.findIndex(
            ({ month }) => month === editedAppointmentMonth,
          );
          const oldAppointmentMonthIndex = appointmentsPerMonths.findIndex(
            ({ month }) => month === oldAppointmentMonth,
          );

          if (
            !appointmentsPerMonths[editedAppointmentMonthIndex] &&
            !appointmentsPerMonths[oldAppointmentMonthIndex].appointments.length
          ) {
            const restOfAppointmentsPerMonths = appointmentsPerMonths.filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== oldAppointmentMonth,
            );

            console.log("Aici 1");

            return {
              ...prev,
              appointmentsPerMonths: [
                ...restOfAppointmentsPerMonths,
                {
                  month: editedAppointmentMonth,
                  appointments: [editedAppointment],
                },
              ].sort(
                (a, b) => months.indexOf(a.month) - months.indexOf(b.month),
              ),
            };
          }

          if (
            !appointmentsPerMonths[editedAppointmentMonthIndex] &&
            appointmentsPerMonths[oldAppointmentMonthIndex].appointments.length
          ) {
            const restOfAppointmentsPerMonths = appointmentsPerMonths.filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== oldAppointmentMonth,
            );

            const restOfAppointmentPerMonth = {
              ...appointmentsPerMonths[oldAppointmentMonthIndex],
              appointments: appointmentsPerMonths[
                oldAppointmentMonthIndex
              ].appointments.filter(
                (appointment) => appointment.id !== appointmentId,
              ),
            };

            console.log("Aici 2");

            return {
              ...prev,
              appointmentsPerMonths: [
                ...restOfAppointmentsPerMonths,
                restOfAppointmentPerMonth,
                {
                  month: editedAppointmentMonth,
                  appointments: [editedAppointment],
                },
              ].sort(
                (a, b) => months.indexOf(a.month) - months.indexOf(b.month),
              ),
            };
          }

          if (editedAppointmentMonth === oldAppointmentMonth) {
            const restOfAppointmentsPerMonths = appointmentsPerMonths.filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== oldAppointmentMonth,
            );

            const restOfAppointmentPerMonth = {
              ...appointmentsPerMonths[oldAppointmentMonthIndex],
              appointments: [
                ...appointmentsPerMonths[
                  oldAppointmentMonthIndex
                ].appointments.filter(
                  (appointment) => appointment.id !== appointmentId,
                ),
                editedAppointment,
              ].sort(
                (a, b) =>
                  new Date(a.startTime).getTime() -
                  new Date(b.startTime).getTime(),
              ),
            };

            console.log("Aici 3");

            return {
              ...prev,
              appointmentsPerMonths: [
                ...restOfAppointmentsPerMonths,
                restOfAppointmentPerMonth,
              ].sort(
                (a, b) => months.indexOf(a.month) - months.indexOf(b.month),
              ),
            };
          }

          const firstHalf = appointmentsPerMonths
            .slice(0, editedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== oldAppointmentMonth,
            )
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== editedAppointmentMonth,
            );

          const secondHalf = appointmentsPerMonths
            .slice(editedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== oldAppointmentMonth,
            )
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== editedAppointmentMonth,
            );

          const restOfAppointmentPerMonth = {
            ...appointmentsPerMonths[oldAppointmentMonthIndex],
            appointments: appointmentsPerMonths[
              oldAppointmentMonthIndex
            ].appointments.filter(
              (appointment) => appointment.id !== appointmentId,
            ),
          };

          return {
            ...prev,
            appointmentsPerMonths: [
              ...firstHalf,
              restOfAppointmentPerMonth,
              {
                ...appointmentsPerMonths[editedAppointmentMonthIndex],
                appointments: [
                  ...appointmentsPerMonths[
                    editedAppointmentMonthIndex
                  ].appointments.filter(
                    (appointment) => appointment.id !== appointmentId,
                  ),
                  editedAppointment,
                ].sort(
                  (a, b) =>
                    new Date(a.startTime).getTime() -
                    new Date(b.startTime).getTime(),
                ),
              },
              ...secondHalf,
            ],
          };
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return { editAppointment, isLoading };
}
