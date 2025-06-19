import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { AddEmployee } from "../../../types/employee.type";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { EmployeesApi } from "../../../services/EmployeesApi";
import { mapEmployee } from "../../../utlis/mapEmployee";
import { PER_PAGE } from "../../../constants/employees";

export function useAddEmployee() {
  const { employees, offset, setEmployees, setOffset } =
    useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function addEmployee(employee: AddEmployee, search: string) {
    setIsLoading(true);

    try {
      const addEmployeeRes = await EmployeesApi.addEmployee(employee);
      const getPagesRes = await EmployeesApi.getEmployeesPages(
        search,
        PER_PAGE,
      );

      const newEmployee = mapEmployee(addEmployeeRes.newEmployee);
      const pages = getPagesRes;

      if (employees.length === 0) {
        setEmployees([{ ...newEmployee, teams: [] }]);
      }

      if (
        pages - 1 === offset &&
        employees.length >= 1 &&
        employees.length < 9
      ) {
        setEmployees((prev) => [...prev, { ...newEmployee, teams: [] }]);
      }

      if (employees.length === 9) {
        setOffset(pages - 1);
      }

      toast.success(addEmployeeRes.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    }

    setIsLoading(false);
  }

  return { addEmployee, isLoading };
}
