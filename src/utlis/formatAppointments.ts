import { Appointment, Appointments } from "../types/appointment.type";

export function formatAppointments(appointments: Appointment[]) {
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

  const appointmentsCopy: Appointment[] = [];

  appointments.forEach((appointment) => appointmentsCopy.push(appointment));

  const result: Appointments = appointmentsCopy
    .map((appointment) => months[new Date(appointment.startTime).getMonth()])
    .filter((month, i, months) => months.indexOf(month) === i)
    .map((month) => ({ month, appointments: [] }));

  appointments.forEach((appointment) => {
    const appointmentMonthIndex = result.findIndex(
      (appointmentsPerMonth) =>
        months[new Date(appointment.startTime).getMonth()] ===
        appointmentsPerMonth.month,
    );

    result[appointmentMonthIndex].appointments.push(appointment);
  });

  result.map((appointmentsPerMonth) => ({
    ...appointmentsPerMonth,
    appointments: appointmentsPerMonth.appointments.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    ),
  }));

  return result;
}
