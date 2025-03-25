import AppointmentItem from "./AppointmentItem";
import Loader from "../../Loader";

import { Appointments } from "../../../types/appointment.type";

type Props = {
  appointments: Appointments;
  isLoading: boolean;
};

export default function AppointmentsList({ appointments, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (
    !appointments.appointmentsPerMonths.find(
      (appointmentsPerMonth) => appointmentsPerMonth.appointments.length,
    ) &&
    !isLoading
  ) {
    return <p className="font-medium">Select a year please</p>;
  }

  return (
    <div className="scrollbar flex flex-col gap-2 overflow-y-auto pr-2">
      {appointments.year && (
        <h1 className="bg-primary self-start rounded-lg px-2 py-1 text-2xl font-semibold text-white">
          {appointments.year}
        </h1>
      )}
      <ul className="flex flex-col gap-4">
        {appointments.appointmentsPerMonths.map((appointmentsPerMonth) => (
          <li key={appointmentsPerMonth.month}>
            <h2 className="mb-2 text-xl font-medium">
              {appointmentsPerMonth.month}
            </h2>
            <ul className="flex flex-col gap-2">
              {appointmentsPerMonth.appointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
