import { useContext } from "react";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
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

export function useDeleteAppointment() {
  const { appointments, isLoading, setAppointments, setIsLoading } =
    useContext(AppointmentsContext);

  // Delete an appointment
  function deleteAppointment(appointmentId: string) {
    setIsLoading(true);
    AppointmentsApi.deleteAppointment(appointmentId)
      .then((res) => {
        const deletedAppointment = mapAppointment(res.deletedAppointment);

        const deletedAppointmentMonth =
          months[new Date(deletedAppointment.startTime).getMonth()];

        const deletedAppointmentMonthIndex =
          appointments.appointmentsPerMonths.findIndex(
            ({ month }) => month === deletedAppointmentMonth,
          );

        setAppointments((prev) => {
          const appointmentsPerMonths = prev.appointmentsPerMonths;

          const firstHalf = appointmentsPerMonths
            .slice(0, deletedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== deletedAppointmentMonth,
            );

          const secondHalf = appointmentsPerMonths
            .slice(deletedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== deletedAppointmentMonth,
            );

          return {
            ...prev,
            appointmentsPerMonths:
              appointmentsPerMonths[deletedAppointmentMonthIndex].appointments
                .length === 1
                ? [...firstHalf, ...secondHalf]
                : [
                    ...firstHalf,
                    {
                      ...appointmentsPerMonths[deletedAppointmentMonthIndex],
                      appointments: appointmentsPerMonths[
                        deletedAppointmentMonthIndex
                      ].appointments.filter(
                        (appointment) => appointment.id !== appointmentId,
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

  return { deleteAppointment, isLoading };
}
