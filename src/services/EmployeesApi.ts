import { AxiosResponse } from "axios";
import { api } from "../config/api";
import {
  AddEmployee,
  EditEmployee,
  EmployeeResponse,
} from "../types/employee.type";

const URL = "/api/employees";

export const EmployeesApi = {
  getEmployees(search: string, offset: number, perPage: number) {
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
  getEmployeesCount(search: string) {
    return api
      .get(`${URL}/retrieve-employees-count?search=${search}`)
      .then(({ data }: AxiosResponse<{ count: number }>) => data.count);
  },
  deleteEmployee(employeeId: string) {
    return api
      .delete(`${URL}/delete-employee/${employeeId}`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
  editEmployee(employeeId: string, newEditedEmployee: EditEmployee) {
    return api
      .put(`${URL}/edit-employee/${employeeId}`, newEditedEmployee)
      .then(
        ({
          data,
        }: AxiosResponse<{
          editedEmployee: EmployeeResponse;
          message: string;
        }>) => data,
      );
  },
  addEmployee(employee: AddEmployee) {
    return api
      .post(`${URL}/add-employee`, employee)
      .then(
        ({
          data,
        }: AxiosResponse<{ newEmployee: EmployeeResponse; message: string }>) =>
          data,
      );
  },
};
