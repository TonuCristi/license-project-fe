import { useContext } from "react";
import toast from "react-hot-toast";

import { CreateAppointment } from "../../../types/appointment.type";
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

export function useCreateAppointment() {
  const {
    appointments,
    appointmentsYears,
    isLoading,
    setAppointments,
    setAppointmentsYears,
    setIsLoading,
  } = useContext(AppointmentsContext);

  // Creates an appointment
  function createAppointment(appointment: CreateAppointment) {
    setIsLoading(true);
    AppointmentsApi.createAppointment(appointment)
      .then((res) => {
        const newAppointment = mapAppointment(res);
        const newAppointmentYear = new Date(
          newAppointment.startTime,
        ).getFullYear();

        // Here we check if the new appointment's year exists in the years list
        if (
          // appointments.year !== newAppointmentYear &&
          !appointmentsYears.includes(newAppointmentYear)
        ) {
          setAppointmentsYears((prev) =>
            [...prev, newAppointmentYear].sort((a, b) => a - b),
          );
        }

        toast.success("Appointment created successfully!");

        // Here we check if a year is selected
        if (!appointments.year) return;

        setAppointments((prev) => {
          const newAppointmentMonth =
            months[new Date(newAppointment.startTime).getMonth()];

          const newAppointmentMonthIndex =
            appointments.appointmentsPerMonths.findIndex(
              ({ month }) => month === newAppointmentMonth,
            );
          const appointmentsPerMonths = prev.appointmentsPerMonths;

          // Here are the months with appointments without the new appointment's month
          const appointmentsPerMonthsWithoutNewAppointmentMonth =
            appointmentsPerMonths.filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== newAppointmentMonth,
            );

          // Here is the new month and new appointment when the new appointment's month doesn't exist
          const newMonthWithNewAppointment = {
            month: newAppointmentMonth,
            appointments: [newAppointment],
          };

          // Here we check if the new appointment's month exists
          const result = appointmentsPerMonths[newAppointmentMonthIndex]
            ? // Here are all the previous months with the new appointment in the already existing month
              [
                ...appointmentsPerMonthsWithoutNewAppointmentMonth,
                {
                  ...appointmentsPerMonths[newAppointmentMonthIndex],
                  appointments: [
                    ...appointmentsPerMonths[newAppointmentMonthIndex]
                      .appointments,
                    newAppointment,
                  ].sort(
                    (a, b) =>
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime(),
                  ),
                },
              ].sort(
                (a, b) => months.indexOf(a.month) - months.indexOf(b.month),
              )
            : // Here are all the previuos months with the new month with the new appointment in it
              [
                ...appointmentsPerMonthsWithoutNewAppointmentMonth,
                newMonthWithNewAppointment,
              ].sort(
                (a, b) => months.indexOf(a.month) - months.indexOf(b.month),
              );

          return {
            ...prev,
            appointmentsPerMonths: result,
          };
        });
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createAppointment, isLoading };
}
