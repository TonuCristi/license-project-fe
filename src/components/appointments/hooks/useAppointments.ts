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
  const [appointmentsYears, setAppointmentsYears] = useState<string[]>([]);
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

  // Creates the appointment
  function createAppointment(appointment: CreateAppointment) {
    setIsLoading(true);
    AppointmentsApi.createAppointment(appointment)
      .then((res) => {
        const newAppointment = mapAppointment(res);
        const newAppointmentYear = new Date(
          newAppointment.startTime,
        ).getFullYear();

        // Checks if the selected year is the same as the new appointment's year and then adds the appointment
        if (appointments.year === newAppointmentYear) {
          const newAppointmentMonth = new Date(
            newAppointment.startTime,
          ).getMonth();

          const newAppointmentIndex =
            appointments.appointmentsPerMonths.findIndex(
              ({ month }) => month === months[newAppointmentMonth],
            );

          setAppointments((prev) => {
            const firstHalf = prev.appointmentsPerMonths
              .slice(0, newAppointmentIndex)
              .filter(
                (appointmentsPerMonth) =>
                  appointmentsPerMonth.month !== months[newAppointmentMonth],
              );
            const secondHalf = prev.appointmentsPerMonths
              .slice(newAppointmentIndex)
              .filter(
                (appointmentsPerMonth) =>
                  appointmentsPerMonth.month !== months[newAppointmentMonth],
              );

            return {
              ...prev,
              appointmentsPerMonths: [
                ...firstHalf,
                {
                  ...prev.appointmentsPerMonths[newAppointmentIndex],
                  appointments: [
                    ...prev.appointmentsPerMonths[newAppointmentIndex]
                      .appointments,
                    newAppointment,
                  ],
                },
                ...secondHalf,
              ],
            };
          });
        }

        // Checks if the selected year is not the same as the new appointment's year and then adds the new year
        if (
          appointments.year !== newAppointmentYear &&
          !appointmentsYears.includes(String(newAppointmentYear))
        ) {
          setAppointmentsYears((prev) => [...prev, String(newAppointmentYear)]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  return {
    getAppointments,
    getAppointmentsFiltersData,
    createAppointment,
    appointments,
    appointmentsYears,
    isAppointmentsLoading,
    isAppointmentsFiltersDataLoading,
    isLoading,
  };
}
