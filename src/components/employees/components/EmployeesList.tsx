import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import EmployeeListItem from "./EmployeeListItem";
import Pagination from "../../Pagination";

import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { PER_PAGE } from "../../../constants/employees";

type Props = {
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function EmployeesList({
  employeesList,
  setEmployeesList,
}: Props) {
  const { employees, pages, offset, isLoading, setOffset } =
    useContext(EmployeesContext);
  const { getEmployees } = useFetchEmployees();
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    if (controllerRef.current) {
      getEmployees(watch("search"), offset, PER_PAGE, controllerRef.current);
    }
  }, [getEmployees, offset, watch]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {employees.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            employeesList={employeesList}
            setEmployeesList={setEmployeesList}
          />
        ))}
      </ul>
      {pages > 1 && (
        <Pagination
          isLoading={isLoading}
          pages={pages}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
