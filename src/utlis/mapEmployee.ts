import { EmployeeResponse } from "../types/employee.type";

export function mapEmployee(employee: EmployeeResponse) {
  const { _id: id, ...rest } = employee;
  return { id, ...rest };
}
