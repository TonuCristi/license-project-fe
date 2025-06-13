import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AddEmployee } from "../../../types/employee.type";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { EmployeesApi } from "../../../services/EmployeesApi";
import { mapEmployee } from "../../../utlis/mapEmployee";
import { PER_PAGE } from "../components/EmployeesList";

export function useAddEmployee() {
  const { employees, offset, setEmployees, setOffset } =
    useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function addEmployee(employee: AddEmployee, search: string) {
    setIsLoading(true);
    Promise.all([
      EmployeesApi.addEmployee(employee),
      EmployeesApi.getEmployeesPages(search, PER_PAGE),
    ])
      .then((res) => {
        const newEmployee = mapEmployee(res[0].newEmployee);
        const pages = res[1] - 1;

        if (pages === offset && employees.length < 9) {
          setEmployees((prev) => [...prev, { ...newEmployee, teams: [] }]);

          return toast.success(res[0].message);
        }

        setOffset(pages);

        toast.success(res[0].message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { addEmployee, isLoading };
}
