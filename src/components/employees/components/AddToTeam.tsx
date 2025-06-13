import { Dispatch, SetStateAction, useContext } from "react";
import { twMerge } from "tailwind-merge";

import Button from "../../Button";
import AddToTeamDropdown from "./AddToTeamDropdown";

import { EmployeesContext } from "../../../contexts/EmployeesContext";

type Props = {
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function AddToTeam({ employeesList, setEmployeesList }: Props) {
  const { isLoading } = useContext(EmployeesContext);

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 items-center gap-2 sm:grid-cols-3 md:grid-cols-[60fr_20fr_20fr]",
      )}
    >
      <span className="font-medium">
        Selected employees: {employeesList.length}
      </span>
      <Button
        disabled={isLoading}
        onClick={() => setEmployeesList([])}
        className="text-nowrap"
      >
        Clear list
      </Button>
      <div className={twMerge(isLoading && "pointer-events-none")}>
        <AddToTeamDropdown employeesList={employeesList} />
      </div>
    </div>
  );
}
