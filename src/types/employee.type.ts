import { z } from "zod";
import { employeeFormSchema } from "../schemas/employeeForm.schema";

export type AddEmployee = z.infer<typeof employeeFormSchema>;

export type EditEmployee = z.infer<typeof employeeFormSchema>;

export type EmployeeResponse = {
  _id: string;
  fullName: string;
  email: string;
  hireDate: string;
  phoneNumber: string;
  membership_id: string;
  teams: string[];
};

export type Employee = {
  id: string;
  fullName: string;
  email: string;
  hireDate: string;
  phoneNumber: string;
  membershipId: string;
  teams: string[];
};
