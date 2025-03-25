import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";
import CreateAppointmentButton from "./CreateAppointmentButton";

import { useAppointments } from "../hooks/useAppointments";

export default function Appointments() {
  const {
    getAppointments,
    getAppointmentsYears,
    createAppointment,
    appointments,
    appointmentsYears,
    isLoading,
  } = useAppointments();

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium">Appointments</h1>
        <CreateAppointmentButton createAppointment={createAppointment} />
      </div>
      <AppointmentsFilters
        getAppointments={getAppointments}
        getAppointmentsYears={getAppointmentsYears}
        appointmentsYears={appointmentsYears}
        isLoading={isLoading}
      />
      <AppointmentsList appointments={appointments} isLoading={isLoading} />
    </div>
  );
}
