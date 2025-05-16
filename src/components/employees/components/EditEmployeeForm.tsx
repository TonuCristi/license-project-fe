import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../Button";
import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";

import { employeeFormSchema } from "../../../schemas/employeeForm.schema";
import { EditEmployee, Employee } from "../../../types/employee.type";
import { useEditEmployee } from "../hooks/useEditEmployee";

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

type Props = {
  employee: Employee;
};

export default function EditEmployeeForm({ employee }: Props) {
  const methods = useForm<EditEmployee>({
    defaultValues: {
      ...employee,
      hireDate: employee.hireDate.split("T")[0],
    },
    resolver: zodResolver(employeeFormSchema),
  });

  const { editEmployee, isLoading } = useEditEmployee();

  const onSubmit: SubmitHandler<EditEmployee> = (data) => {
    editEmployee(employee.id, data);
  };
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-64 xxs:-translate-x-1/2 xs:-translate-x-0 xs:right-0 absolute top-full z-50 mt-3 flex w-52 -translate-x-3/5 flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Edit employee</h2>
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
        <Button disabled={isLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
