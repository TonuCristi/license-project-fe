import { useCallback, useState } from "react";

import {
  Appointments,
  CreateAppointment,
} from "../../../types/appointment.type";
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

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointments>({
    year: null,
    appointmentsPerMonths: [],
  });
  const [appointmentsYears, setAppointmentsYears] = useState<number[]>([]);
  const [
    isAppointmentsFiltersDataLoading,
    setIsAppointmentsFiltersDataLoading,
  ] = useState<boolean>(true);
  const [isAppointmentsLoading, setIsAppointmentsLoading] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Gets all the apppointments
  function getAppointments(year?: string, month?: string, day?: string) {
    if (year === "" && month === "" && day === "") {
      return setAppointments({
        year: null,
        appointmentsPerMonths: [],
      });
    }

    setIsAppointmentsLoading(true);
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
      .finally(() => setIsAppointmentsLoading(false));
  }

  // Get appointements filters data
  const getAppointmentsFiltersData = useCallback(function () {
    AppointmentsApi.getAppointmentsYears()
      .then((res) => setAppointmentsYears(res))
      .catch((error) => console.log(error))
      .finally(() => setIsAppointmentsFiltersDataLoading(false));
  }, []);

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
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

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

  return {
    getAppointments,
    getAppointmentsFiltersData,
    createAppointment,
    deleteAppointment,
    appointments,
    appointmentsYears,
    isAppointmentsLoading,
    isAppointmentsFiltersDataLoading,
    isLoading,
  };
}
