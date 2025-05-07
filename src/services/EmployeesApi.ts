import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { EmployeeResponse } from "../types/employee.type";

const URL = "/api/employees";

export const EmployeesApi = {
  getEmployees(search: string, offset: string, perPage: string) {
    return api
      .get(
        `${URL}/retrieve-employees?search=${search}&offset=${offset}&perPage=${perPage}`,
      )
      .then(
        ({
          data,
        }: AxiosResponse<{ employees: EmployeeResponse[]; pages: number }>) =>
          data,
      );
  },
  deleteEmployee(employeeId: string) {
    return api
      .delete(`${URL}/delete-employee/${employeeId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
