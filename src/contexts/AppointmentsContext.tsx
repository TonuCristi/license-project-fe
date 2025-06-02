import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Appointment } from "../types/appointment.type";

type AppointmentsContext = {
  appointments: Appointment[];
  appointmentsYears: number[];
  isLoading: boolean;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
  setAppointmentsYears: Dispatch<SetStateAction<number[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppointmentsContext = createContext<AppointmentsContext>({
  appointments: [],
  appointmentsYears: [],
  isLoading: false,
  setAppointments: () => undefined,
  setAppointmentsYears: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function AppointmentsProvider({ children }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsYears, setAppointmentsYears] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        appointmentsYears,
        isLoading,
        setAppointments,
        setAppointmentsYears,
        setIsLoading,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}
