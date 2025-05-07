import { z } from "zod";
import { employeeFormSchema } from "../schemas/employeeForm.schema";

export type AddEmployee = z.infer<typeof employeeFormSchema>;
