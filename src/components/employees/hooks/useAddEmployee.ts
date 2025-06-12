import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AddEmployee } from "../../../types/employee.type";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { EmployeesApi } from "../../../services/EmployeesApi";
import { mapEmployee } from "../../../utlis/mapEmployee";

export function useAddEmployee() {
  const { employees, setEmployees } = useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addEmployee(employee: AddEmployee, search: string) {
    setIsLoading(true);
    Promise.all([
      EmployeesApi.addEmployee(employee),
      EmployeesApi.getEmployeesCount(search),
    ])
      .then((res) => {
        console.log(res);
        const newEmployee = mapEmployee(res[0].newEmployee);

        // if (employees.length < 9) {
        //   setEmployees((prev) => [...prev, { ...newEmployee, teams: [] }]);
        // }

        // toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { addEmployee, isLoading };
}
