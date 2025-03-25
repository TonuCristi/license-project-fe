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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getAppointments(year?: string, month?: string, day?: string) {
    if (year === "" && month === "" && day === "") {
      return setAppointments({
        year: null,
        appointmentsPerMonths: [],
      });
    }

    setIsLoading(true);
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
      .finally(() => setIsLoading(false));
  }

  const getAppointmentsYears = useCallback(function () {
    AppointmentsApi.getAppointmentsYears()
      .then((res) => setAppointmentsYears(res))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function createAppointment(appointment: CreateAppointment) {
    setIsLoading(true);
    AppointmentsApi.createAppointment(appointment)
      .then((res) => {
        const newAppointment = mapAppointment(res);
        const newAppointmentYear = new Date(
          newAppointment.startTime,
        ).getFullYear();

        if (appointments.year === newAppointmentYear) {
          const newAppointmentMonth = new Date(
            newAppointment.startTime,
          ).getMonth();

          const newAppointmentIndex =
            appointments.appointmentsPerMonths.findIndex(
              ({ month }) => month === months[newAppointmentMonth],
            );

          setAppointments((prev) => {
            return {
              ...prev,
              appointmentsPerMonths: [
                {
                  ...prev.appointmentsPerMonths[newAppointmentIndex],
                  appointments: [
                    ...prev.appointmentsPerMonths[newAppointmentIndex]
                      .appointments,
                    newAppointment,
                  ],
                },
                ...prev.appointmentsPerMonths.filter(
                  (_, i) => i !== newAppointmentIndex,
                ),
              ],
            };
          });
        }
        console.log(res);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  console.log(appointments);

  return {
    getAppointments,
    getAppointmentsYears,
    createAppointment,
    appointments,
    appointmentsYears,
    isLoading,
  };
}
