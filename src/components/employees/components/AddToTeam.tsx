import { Dispatch, SetStateAction, useContext } from "react";

import Button from "../../Button";
import AddToTeamDropdown from "./AddToTeamDropdown";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { twMerge } from "tailwind-merge";

type Props = {
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function AddToTeam({ employeesList, setEmployeesList }: Props) {
  const { isLoading } = useContext(EmployeesContext);

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 items-center gap-2 sm:grid-cols-[60fr_20fr_20fr]",
        isLoading && "pointer-events-none",
      )}
    >
      <span className="font-medium">
        Selected employees: {employeesList.length}
      </span>
      <Button onClick={() => setEmployeesList([])} className="text-nowrap">
        Clear list
      </Button>
      <AddToTeamDropdown employeesList={employeesList} />
    </div>
  );
}
