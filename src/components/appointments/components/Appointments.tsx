import AppointmentsFilters from "./AppointmentsFilters";

export default function Appointments() {
  return (
    <div className="flex h-full flex-col gap-5 overflow-hidden p-4">
      <h1 className="text-xl font-medium">Appointments</h1>
      <AppointmentsFilters />
    </div>
  );
}
