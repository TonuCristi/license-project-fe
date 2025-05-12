import { Dispatch, SetStateAction } from "react";

import Button from "../../Button";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import EditEmployeeButton from "./EditEmployeeButton";

import { Employee } from "../../../types/employee.type";
import { twMerge } from "tailwind-merge";

type Props = {
  employee: Employee;
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function EmployeeListItem({
  employee,
  employeesList,
  setEmployeesList,
}: Props) {
  const isSelected = employeesList.find(
    (employeeId) => employeeId === employee.id,
  );

  function handleAddEmployee() {
    setEmployeesList((prev) =>
      isSelected
        ? [...prev.filter((employeeId) => employeeId !== employee.id)]
        : [...prev, employee.id],
    );
  }

  return (
    <li
      className={twMerge(
        "border-primary xs:flex-row flex flex-col justify-between gap-2 rounded-xl border-2 p-2",
        !!isSelected && "bg-blue-200",
      )}
    >
      <div className="flex flex-col gap-1 break-all">
        <p>
          <span className="font-medium">Full name:</span> {employee.fullName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {employee.email}
        </p>
        <p>
          <span className="font-medium">Phone number:</span>{" "}
          {employee.phoneNumber}
        </p>
        {employee.teams.length > 0 && (
          <p>
            <span className="font-medium">Teams:</span>{" "}
            {employee.teams.join(", ")}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 self-start">
        <Button onClick={handleAddEmployee}>
          {isSelected ? "Deselect" : "Select"}
        </Button>
        <DeleteEmployeeButton employeeId={employee.id} />
        <EditEmployeeButton employee={employee} />
      </div>
    </li>
  );
}
