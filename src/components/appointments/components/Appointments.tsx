import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";
import CreateAppointmentButton from "./CreateAppointmentButton";

import { useAppointments } from "../hooks/useAppointments";

export default function Appointments() {
  const {
    getAppointments,
    getAppointmentsFiltersData,
    createAppointment,
    deleteAppointment,
    appointments,
    appointmentsYears,
    isAppointmentsLoading,
    isAppointmentsFiltersDataLoading,
    isLoading,
  } = useAppointments();

  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-medium">Appointments</h1>
        <CreateAppointmentButton
          createAppointment={createAppointment}
          isLoading={isLoading}
        />
      </div>
      <AppointmentsFilters
        getAppointments={getAppointments}
        getAppointmentsFiltersData={getAppointmentsFiltersData}
        appointmentsYears={appointmentsYears}
        isAppointmentsFiltersDataLoading={isAppointmentsFiltersDataLoading}
      />
      <AppointmentsList
        appointments={appointments}
        isAppointmentsLoading={isAppointmentsLoading}
        deleteAppointment={deleteAppointment}
        isLoading={isLoading}
      />
    </div>
  );
}
