import { useContext } from "react";

import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsList from "./AppointmentsList";
import CreateAppointmentButton from "./CreateAppointmentButton";

import { RoomContext } from "../../../contexts/RoomContext";
import { UserContext } from "../../../contexts/UserContext";

export default function Appointments() {
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  return (
    <div className="flex h-full flex-col gap-5 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-medium md:text-xl">Appointments</h1>
        {room && <CreateAppointmentButton />}
      </div>
      {!room && user?.role === "assistant" && (
        <p className="font-medium">
          You should be part of a room to access appointments!
        </p>
      )}
      {(!!room || user?.role !== "assistant") && (
        <div className="scrollbar flex flex-col gap-3 overflow-y-auto pr-2">
          <AppointmentsFilters />
          <AppointmentsList />
        </div>
      )}
    </div>
  );
}
