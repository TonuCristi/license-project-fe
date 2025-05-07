import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Employee } from "../types/employee.type";

type EmployeesContext = {
  employees: Employee[];
  pages: number;
  isLoading: boolean;
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
  setPages: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const EmployeesContext = createContext<EmployeesContext>({
  employees: [],
  pages: 0,
  isLoading: false,
  setEmployees: () => undefined,
  setPages: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function EmployeesProvider({ children }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        pages,
        isLoading,
        setEmployees,
        setPages,
        setIsLoading,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
}
