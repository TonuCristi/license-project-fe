import { Dispatch, SetStateAction } from "react";

import Button from "../../Button";

import { Employee } from "../../../types/employee.type";

type Props = {
  employee: Employee;
  employeeList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function TeamMemberListItem({ employee }: Props) {
  return (
    <li className="border-primary xs:flex-row flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <div className="flex flex-col gap-1">
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
        <p>
          <span className="font-medium">Teams:</span> team1, team2, team3
        </p>
      </div>
      <div className="flex items-center gap-2 self-start">
        <Button>Select</Button>
        {/* <DeleteEmployeeButton employeeId={employee.id} /> */}
      </div>
    </li>
  );
}
