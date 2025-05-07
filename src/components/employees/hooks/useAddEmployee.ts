import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AddEmployee } from "../../../types/employee.type";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { EmployeesApi } from "../../../services/EmployeesApi";
import { mapEmployee } from "../../../utlis/mapEmployee";

export function useAddEmployee() {
  const { employees, pages, setEmployees, setPages, setOffset } =
    useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addEmployee(employee: AddEmployee) {
    setIsLoading(true);
    EmployeesApi.addEmployee(employee)
      .then((res) => {
        const newEmployee = mapEmployee(res.newEmployee);

        if (employees.length < 9) {
          setEmployees((prev) => [...prev, newEmployee]);
        }

        if (employees.length === 9) {
          setPages((prev) => prev + 1);
          setOffset(pages);
        }

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { addEmployee, isLoading };
}
