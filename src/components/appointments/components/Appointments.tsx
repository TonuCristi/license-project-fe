import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";

import { useAppointments } from "../hooks/useAppointments";

export default function Appointments() {
  const { appointments, isLoading } = useAppointments();

  return (
    <div className="flex h-full flex-col gap-5 overflow-hidden p-4">
      <h1 className="text-xl font-medium">Appointments</h1>
      <AppointmentsFilters />
      <AppointmentsList appointments={appointments} isLoading={isLoading} />
    </div>
  );
}
