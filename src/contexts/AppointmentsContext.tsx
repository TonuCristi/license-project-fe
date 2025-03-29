import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Appointments } from "../types/appointment.type";

type AppointmentsContext = {
  appointments: Appointments;
  appointmentsYears: number[];
  isAppointmentsFiltersDataLoading: boolean;
  isAppointmentsLoading: boolean;
  isLoading: boolean;
  setAppointments: Dispatch<SetStateAction<Appointments>>;
  setAppointmentsYears: Dispatch<SetStateAction<number[]>>;
  setIsAppointmentsFiltersDataLoading: Dispatch<SetStateAction<boolean>>;
  setIsAppointmentsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppointmentsContext = createContext<AppointmentsContext>({
  appointments: {
    year: null,
    appointmentsPerMonths: [],
  },
  appointmentsYears: [],
  isAppointmentsFiltersDataLoading: true,
  isAppointmentsLoading: false,
  isLoading: false,
  setAppointments: () => undefined,
  setAppointmentsYears: () => undefined,
  setIsAppointmentsFiltersDataLoading: () => undefined,
  setIsAppointmentsLoading: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function AppointmentsProvider({ children }: Props) {
  const [appointments, setAppointments] = useState<Appointments>({
    year: null,
    appointmentsPerMonths: [],
  });
  const [appointmentsYears, setAppointmentsYears] = useState<number[]>([]);
  const [
    isAppointmentsFiltersDataLoading,
    setIsAppointmentsFiltersDataLoading,
  ] = useState<boolean>(true);
  const [isAppointmentsLoading, setIsAppointmentsLoading] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        appointmentsYears,
        isAppointmentsFiltersDataLoading,
        isAppointmentsLoading,
        isLoading,
        setAppointments,
        setAppointmentsYears,
        setIsAppointmentsFiltersDataLoading,
        setIsAppointmentsLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}
