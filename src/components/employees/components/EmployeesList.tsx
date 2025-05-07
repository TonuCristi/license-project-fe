import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const { employees, pages, isLoading } = useContext(EmployeesContext);
  const methods = useFormContext();
  const { getEmployees } = useFetchEmployees();
  const [offset, setOffset] = useState<number>(0);

  const { watch } = methods;

  useEffect(() => {
    getEmployees(watch("value"), `${offset}`, "9");
  }, [getEmployees, offset, watch]);

  return (
    <div className="flex flex-col items-center gap-8">
      <ul className="flex w-full flex-col gap-2">
        {employees.map((employee) => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            employeeList={employeesList}
            setEmployeesList={setEmployeesList}
          />
        ))}
      </ul>
      <Pagination
        isLoading={isLoading}
        pages={pages}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
}
