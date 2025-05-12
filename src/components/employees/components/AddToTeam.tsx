import { Dispatch, SetStateAction } from "react";

import Button from "../../Button";
import AddToTeamDropdown from "./AddToTeamDropdown";

type Props = {
  employeesList: string[];
  setEmployeesList: Dispatch<SetStateAction<string[]>>;
};

export default function AddToTeam({ employeesList, setEmployeesList }: Props) {
  return (
    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[60fr_20fr_20fr]">
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
