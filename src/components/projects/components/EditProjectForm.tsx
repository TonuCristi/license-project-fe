import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../Button";
import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";

import { EditProject, Project } from "../../../types/project.type";
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

type Props = {
  project: Project;
  editProject: (projectId: string, newEditedProject: EditProject) => void;
  isEditLoading: boolean;
};

export default function EditProjectForm({
  project,
  editProject,
  isEditLoading,
}: Props) {
  const methods = useForm<EditProject>({
    defaultValues: {
      name: project.name,
      description: project.description,
      startDate: project.startDate.split("T")[0],
      deadline: project.deadline.split("T")[0],
    },
    resolver: zodResolver(projectFormSchema),
  });

  const onSubmit: SubmitHandler<EditProject> = (data) =>
    editProject(project.id, data);

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
        <h2 className="mb-1 text-lg font-medium">Edit project</h2>
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
        <Button disabled={isEditLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
