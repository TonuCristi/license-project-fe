import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { useCreateProject } from "../hooks/useCreateProject";
import { CreateProject } from "../../../types/project.type";
import { projectFormSchema } from "../../../schemas/projectForm.schema";
import Textarea from "../../Textarea";

const inputs = [
  {
    label: "Name",
    id: "name",
    name: "name",
    placeholder: "Name...",
    type: "text",
  },
  {
    label: "Start date",
    id: "startDate",
    name: "startDate",
    placeholder: "Start date...",
    type: "date",
  },
  {
    label: "Deadline",
    id: "deadline",
    name: "deadline",
    placeholder: "Deadline...",
    type: "date",
  },
] as const;

export default function CreateProjectForm() {
  const methods = useForm<CreateProject>({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      deadline: "",
    },
    resolver: zodResolver(projectFormSchema),
  });

  const { watch } = useFormContext();

  const { createProject, isLoading } = useCreateProject();
  const { isLoading: isEmployeesLoading } = useContext(EmployeesContext);

  const onSubmit: SubmitHandler<CreateProject> = (data) => {
    createProject(data, watch("search"), watch("state"));
  };

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
        <h2 className="mb-1 text-lg font-medium">Create project</h2>
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
          <InputContainer>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Description..."
              className="scrollbar"
            />
            {errors.description && (
              <Message variant="error">{errors.description.message}</Message>
            )}
          </InputContainer>
        </div>
        <Button disabled={isLoading || isEmployeesLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
