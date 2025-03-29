import { useCallback, useState } from "react";

import {
  Appointments,
  CreateAppointment,
  EditAppointment,
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

  // Creates an appointment
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

          const newAppointmentMonthIndex =
            appointments.appointmentsPerMonths.findIndex(
              ({ month }) => month === months[newAppointmentMonth],
            );

          setAppointments((prev) => {
            const firstHalf = prev.appointmentsPerMonths
              .slice(0, newAppointmentMonthIndex)
              .filter(
                (appointmentsPerMonth) =>
                  appointmentsPerMonth.month !== months[newAppointmentMonth],
              );
            const secondHalf = prev.appointmentsPerMonths
              .slice(newAppointmentMonthIndex)
              .filter(
                (appointmentsPerMonth) =>
                  appointmentsPerMonth.month !== months[newAppointmentMonth],
              );

            return {
              ...prev,
              appointmentsPerMonths: [
                ...firstHalf,
                {
                  ...prev.appointmentsPerMonths[newAppointmentMonthIndex],
                  appointments: [
                    ...prev.appointmentsPerMonths[newAppointmentMonthIndex]
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

  // Delete an appointment
  function deleteAppointment(appointmentId: string) {
    setIsLoading(true);
    AppointmentsApi.deleteAppointment(appointmentId)
      .then((res) => {
        const deletedAppointment = mapAppointment(res.deletedAppointment);

        const deletedAppointmentMonth = new Date(
          deletedAppointment.startTime,
        ).getMonth();

        const deletedAppointmentMonthIndex =
          appointments.appointmentsPerMonths.findIndex(
            ({ month }) => month === months[deletedAppointmentMonth],
          );

        setAppointments((prev) => {
          const firstHalf = prev.appointmentsPerMonths
            .slice(0, deletedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== months[deletedAppointmentMonth],
            );

          const secondHalf = prev.appointmentsPerMonths
            .slice(deletedAppointmentMonthIndex)
            .filter(
              (appointmentsPerMonth) =>
                appointmentsPerMonth.month !== months[deletedAppointmentMonth],
            );

          return {
            ...prev,
            appointmentsPerMonths: [
              ...firstHalf,
              {
                ...prev.appointmentsPerMonths[deletedAppointmentMonthIndex],
                appointments: prev.appointmentsPerMonths[
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

  // console.log(months.map((month, i) => ({ month, key: i })));

  return {
    getAppointments,
    getAppointmentsFiltersData,
    createAppointment,
    deleteAppointment,
    editAppointment,
    appointments,
    appointmentsYears,
    isAppointmentsLoading,
    isAppointmentsFiltersDataLoading,
    isLoading,
  };
}
