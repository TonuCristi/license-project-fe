import { EmployeeResponse } from "../types/employee.type";

export function mapEmployee(employee: EmployeeResponse) {
  const { _id: id, chief_id: chiefId, ...rest } = employee;
  return { id, chiefId, ...rest };
}
