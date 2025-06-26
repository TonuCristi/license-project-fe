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

import { CreateTeam } from "../../../types/team.type";
import { teamFormSchema } from "../../../schemas/teamForm.schema";
import { useCreateTeam } from "../hooks/useCreateTeam";

const inputs = [
  {
    label: "Name",
    id: "name",
    name: "name",
    placeholder: "Name...",
    type: "text",
  },
  {
    label: "Leader email",
    id: "leaderEmail",
    name: "leaderEmail",
    placeholder: "Leader email...",
    type: "text",
  },
] as const;

export default function CreateTeamForm() {
  const methods = useForm<CreateTeam>({
    defaultValues: {
      name: "",
      leaderEmail: "",
    },
    resolver: zodResolver(teamFormSchema),
  });

  const { createTeam, isLoading } = useCreateTeam();

  const { watch } = useFormContext();

  const onSubmit: SubmitHandler<CreateTeam> = (data) =>
    createTeam(data, watch("search"));

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-64 absolute top-full right-0 z-50 mt-3 flex w-full flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Create team</h2>
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
        <Button disabled={isLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
