import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";

import { useAppointments } from "../hooks/useAppointments";

export default function Appointments() {
  const {
    getAppointments,
    getAppointmentsYears,
    appointments,
    appointmentsYears,
    isLoading,
    isFiltersDataLoading,
  } = useAppointments();

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <h1 className="text-xl font-medium">Appointments</h1>
      <AppointmentsFilters
        getAppointments={getAppointments}
        getAppointmentsYears={getAppointmentsYears}
        appointmentsYears={appointmentsYears}
        isFiltersDataLoading={isFiltersDataLoading}
      />
      <AppointmentsList appointments={appointments} isLoading={isLoading} />
    </div>
  );
}
