import { Dispatch, SetStateAction } from "react";

import EmployeeListItem from "./EmployeeListItem";
import Pagination from "../../Pagination";

type Props = {
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function EmployeesList({
  employeesList,
  setEmployeesList,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <ul className="flex w-full flex-col gap-2">
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
        <EmployeeListItem
          employeeList={employeesList}
          setEmployeesList={setEmployeesList}
        />
      </ul>
      <Pagination />
    </div>
  );
}
