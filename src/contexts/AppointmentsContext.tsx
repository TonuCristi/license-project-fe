import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Appointment } from "../types/appointment.type";

const defaultFilters = {
  year: "",
  month: "",
  day: "",
};

type Filters = {
  year: string;
  month: string;
  day: string;
};

type AppointmentsContext = {
  appointments: Appointment[];
  appointmentsYears: number[];
  filters: Filters;
  isAppointmentsFiltersDataLoading: boolean;
  isLoading: boolean;
  setAppointments: Dispatch<SetStateAction<Appointment[]>>;
  setAppointmentsYears: Dispatch<SetStateAction<number[]>>;
  setFilters: Dispatch<SetStateAction<Filters>>;
  setIsAppointmentsFiltersDataLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AppointmentsContext = createContext<AppointmentsContext>({
  appointments: [],
  appointmentsYears: [],
  filters: defaultFilters,
  isAppointmentsFiltersDataLoading: true,
  isLoading: false,
  setAppointments: () => undefined,
  setAppointmentsYears: () => undefined,
  setFilters: () => undefined,
  setIsAppointmentsFiltersDataLoading: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function AppointmentsProvider({ children }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentsYears, setAppointmentsYears] = useState<number[]>([]);
  const [
    isAppointmentsFiltersDataLoading,
    setIsAppointmentsFiltersDataLoading,
  ] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        appointmentsYears,
        filters,
        isAppointmentsFiltersDataLoading,
        isLoading,
        setAppointments,
        setAppointmentsYears,
        setFilters,
        setIsAppointmentsFiltersDataLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}
