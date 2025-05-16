import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { employeeFormSchema } from "../../../schemas/employeeForm.schema";
import { AddEmployee } from "../../../types/employee.type";
import { useAddEmployee } from "../hooks/useAddEmployee";

const inputs = [
  {
    label: "Full name",
    id: "fullName",
    name: "fullName",
    placeholder: "Full name...",
    type: "text",
  },
  {
    label: "Phone number",
    id: "phoneNumber",
    name: "phoneNumber",
    placeholder: "Phone number...",
    type: "text",
  },
  {
    label: "Email",
    id: "email",
    name: "email",
    placeholder: "Email...",
    type: "text",
  },
  {
    label: "Hire date",
    id: "hireDate",
    name: "hireDate",
    placeholder: "Hire date...",
    type: "date",
  },
] as const;

export default function AddEmployeeForm() {
  const methods = useForm<AddEmployee>({
    defaultValues: {
      fullName: "",
      email: "",
    },
    resolver: zodResolver(employeeFormSchema),
  });

  const { addEmployee, isLoading } = useAddEmployee();

  const onSubmit: SubmitHandler<AddEmployee> = (data) => addEmployee(data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-64 absolute top-full right-0 z-50 mt-3 flex w-52 flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Add employee</h2>
        <div className="mb-3 flex flex-col gap-3">
          {inputs.map(({ label, id, name, placeholder, type }) => (
            <InputContainer key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
              />
              {errors[name] && (
                <Message variant="error">{errors[name].message}</Message>
              )}
            </InputContainer>
          ))}
        </div>
        <Button disabled={isLoading}>Add</Button>
      </form>
    </FormProvider>
  );
}
