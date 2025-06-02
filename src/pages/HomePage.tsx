import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CreateAppointmentButton from "../components/appointments/components/CreateAppointmentButton";
import AppointmentsList from "../components/appointments/components/AppointmentsList";
import PageTitle from "../components/PageTitle";
import AppointmentsDateFilters from "../components/appointments/components/AppointmentsDateFilters";

import { UserContext } from "../contexts/UserContext";
import { RoomContext } from "../contexts/RoomContext";
import { appointmentsFiltersSchema } from "../schemas/appointmentsFilters.schema";
import AppointmentsProvider from "../contexts/AppointmentsContext";

export default function HomePage() {
  const methods = useForm({
    defaultValues: {
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
        <main className="border-primary m-auto flex h-full w-full flex-col gap-5 overflow-hidden border-x-2 p-2 sm:p-4 lg:w-5xl">
          <div className="flex items-center justify-between gap-4">
            <PageTitle>Appointments</PageTitle>
            {(!!room || user?.role !== "assistant") && (
              <CreateAppointmentButton />
            )}
          </div>
          {!room && user?.role === "assistant" && (
            <p className="font-medium">
              You should be part of a room to access appointments!
            </p>
          )}
          {(!!room || user?.role !== "assistant") && (
            <div className="scrollbar flex h-full flex-col gap-3 overflow-y-auto pr-2">
              <AppointmentsDateFilters />
              {watch("year") ? (
                <AppointmentsList />
              ) : (
                <p>Select a year to see the meetings.</p>
              )}
            </div>
          )}
        </main>
      </FormProvider>
    </AppointmentsProvider>
  );
}
