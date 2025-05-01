import AppointmentItem from "./AppointmentItem";
import Loader from "../../Loader";

import { useContext } from "react";
import { AppointmentsContext } from "../../../contexts/AppointmentsContext";

export default function AppointmentsList() {
  const { appointments, isAppointmentsLoading } =
    useContext(AppointmentsContext);

  if (isAppointmentsLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (
    !appointments.appointmentsPerMonths.find(
      (appointmentsPerMonth) => appointmentsPerMonth.appointments.length,
    ) &&
    !isAppointmentsLoading
  ) {
    return <p className="font-medium">Select a year please</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {appointments.year && (
        <h1 className="bg-primary self-start rounded-lg px-2 py-1 text-lg font-semibold text-white md:text-2xl">
          {appointments.year}
        </h1>
      )}
      <ul className="flex flex-col gap-4">
        {appointments.appointmentsPerMonths.map((appointmentsPerMonth) => (
          <li key={appointmentsPerMonth.month}>
            <h2 className="mb-2 text-xl font-medium">
              {appointmentsPerMonth.month}
            </h2>
            <ul className="flex flex-col gap-2">
              {appointmentsPerMonth.appointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
