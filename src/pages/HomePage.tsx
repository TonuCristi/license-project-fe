import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CreateAppointmentButton from "../components/appointments/components/CreateAppointmentButton";
import AppointmentsList from "../components/appointments/components/AppointmentsList";
import PageTitle from "../components/PageTitle";
import AppointmentsDateFilters from "../components/appointments/components/AppointmentsDateFilters";
import Select from "../components/Select";

import { UserContext } from "../contexts/UserContext";
import { RoomContext } from "../contexts/RoomContext";
import { appointmentsFiltersSchema } from "../schemas/appointmentsFilters.schema";
import AppointmentsProvider from "../contexts/AppointmentsContext";
import { AppointmentDateFilters } from "../types/appointment.type";

const stateOptions = [
  { value: "upcoming", text: "Upcoming" },
  { value: "progress", text: "In progess" },
  { value: "finished", text: "Finished" },
];

export default function HomePage() {
  const methods = useForm<AppointmentDateFilters>({
    defaultValues: {
      appointmentState: "",
      year: "",
      month: "",
      day: "",
    },
    resolver: zodResolver(appointmentsFiltersSchema),
  });
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  const { watch } = methods;

  return (
    <AppointmentsProvider>
      <FormProvider {...methods}>
        <main className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-5 overflow-hidden overflow-y-auto border-x-2 p-2 pr-2 sm:p-4 lg:w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
            <PageTitle>Appointments</PageTitle>
            {(!!room || user?.role !== "assistant") && (
              <>
                <div className="w-full md:col-start-3">
                  <Select
                    name="appointmentState"
                    placeholder="Select the state"
                    className="ml-auto w-full"
                    options={stateOptions}
                  />
                </div>
                <div className="w-full md:col-start-4">
                  <CreateAppointmentButton />
                </div>
              </>
            )}
          </div>
          {!room && user?.role === "assistant" && (
            <p className="font-medium">
              You should be part of a room to access appointments!
            </p>
          )}
          {(!!room || user?.role !== "assistant") &&
            (watch("appointmentState") ? (
              <div className="flex flex-col gap-3">
                <AppointmentsDateFilters />
                {watch("year") ? (
                  <AppointmentsList />
                ) : (
                  <p>Select a year to see the appointments.</p>
                )}
              </div>
            ) : (
              <p>Select the state to see the appointments.</p>
            ))}
        </main>
      </FormProvider>
    </AppointmentsProvider>
  );
}
