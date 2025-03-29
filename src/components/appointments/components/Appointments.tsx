import AppointmentsProvider from "../../../contexts/AppointmentsContext";
import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";
import CreateAppointmentButton from "./CreateAppointmentButton";

export default function Appointments() {
  return (
    <AppointmentsProvider>
      <div className="flex h-full flex-col gap-5 p-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-medium">Appointments</h1>
          <CreateAppointmentButton />
        </div>
        <AppointmentsFilters />
        <AppointmentsList />
      </div>
    </AppointmentsProvider>
  );
}
