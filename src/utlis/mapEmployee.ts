import { EmployeeResponse } from "../types/employee.type";

export function mapEmployee(employee: EmployeeResponse) {
  const { _id: id, membership_id: membershipId, ...rest } = employee;
  return { id, membershipId, ...rest };
}
