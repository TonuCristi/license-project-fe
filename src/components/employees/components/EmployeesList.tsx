import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import EmployeeListItem from "./EmployeeListItem";
import Pagination from "../../Pagination";

import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { useFetchEmployees } from "../hooks/useFetchEmployees";

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
  const methods = useFormContext();
  const { getEmployees } = useFetchEmployees();

  const { watch } = methods;

  useEffect(() => {
    getEmployees(watch("value"), offset, 9);
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
