import { useContext } from "react";

import CreateAppointmentButton from "../components/appointments/components/CreateAppointmentButton";
import AppointmentsFilters from "../components/appointments/components/AppointmentsFilters";
import AppointmentsList from "../components/appointments/components/AppointmentsList";
import PageTitle from "../components/PageTitle";

import { UserContext } from "../contexts/UserContext";
import { RoomContext } from "../contexts/RoomContext";

export default function HomePage() {
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  return (
    <main className="border-primary m-auto flex h-full w-full flex-col gap-5 overflow-hidden border-x-2 p-2 sm:p-4 lg:w-5xl">
      <div className="flex items-center justify-between gap-4">
        <PageTitle>Appointments</PageTitle>
        {(!!room || user?.role !== "assistant") && <CreateAppointmentButton />}
      </div>
      {!room && user?.role === "assistant" && (
        <p className="font-medium">
          You should be part of a room to access appointments!
        </p>
      )}
      {(!!room || user?.role !== "assistant") && (
        <div className="scrollbar flex h-full flex-col gap-3 overflow-y-auto pr-2">
          <AppointmentsFilters />
          <AppointmentsList />
        </div>
      )}
    </main>
  );
}
