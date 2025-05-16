import { useContext } from "react";

import Loader from "../../Loader";
import AppointmentListItem from "./AppointmentListItem";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { formatAppointments } from "../../../utlis/formatAppointments";

export default function AppointmentsList() {
  const { appointments, isLoading } = useContext(AppointmentsContext);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  const appointmentsPerMonths = formatAppointments(appointments);

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-4">
        {appointmentsPerMonths.map((appointmentsPerMonth) => (
          <li key={appointmentsPerMonth.month}>
            <h2 className="mb-2 text-xl font-medium">
              {appointmentsPerMonth.month}
            </h2>
            <ul className="flex flex-col gap-2">
              {appointmentsPerMonth.appointments.map((appointment) => (
                <AppointmentListItem
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
