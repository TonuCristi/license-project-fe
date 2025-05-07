import { useState } from "react";

import AddToTeam from "./AddToTeam";
import EmployeesList from "./EmployeesList";

export default function Employees() {
  const [employeesList, setEmployeesList] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <AddToTeam employeeList={employeesList} />
      <EmployeesList
        employeesList={employeesList}
        setEmployeesList={setEmployeesList}
      />
    </div>
  );
}
