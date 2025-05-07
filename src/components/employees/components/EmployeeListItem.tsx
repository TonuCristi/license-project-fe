import { Dispatch, SetStateAction } from "react";

import Button from "../../Button";
import DeleteEmployeeButton from "./DeleteEmployeeButton";

type Props = {
  employeeList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function EmployeeListItem({
  employeesList,
  setEmployeesList,
}: Props) {
  return (
    <li className="border-primary xs:flex-row flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <div className="flex flex-col gap-1">
        <p>
          <span className="font-medium">Full name:</span> example example
        </p>
        <p>
          <span className="font-medium">Email:</span> example@example.com
        </p>
        <p>
          <span className="font-medium">Teams:</span> team1, team2, team3
        </p>
      </div>
      <div className="flex items-center gap-2 self-start">
        <Button>Select</Button>
        <DeleteEmployeeButton />
      </div>
    </li>
  );
}
