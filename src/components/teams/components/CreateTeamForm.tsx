import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { CreateTeam } from "../../../types/team.type";
import { teamFormSchema } from "../../../schemas/teamForm.schema";
import { useCreateTeam } from "../hooks/useCreateTeam";

export default function CreateTeamForm() {
  const methods = useForm<CreateTeam>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(teamFormSchema),
  });

  const { createTeam, isLoading } = useCreateTeam();

  const onSubmit: SubmitHandler<CreateTeam> = (data) => createTeam(data);

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
        <h2 className="mb-1 text-lg font-medium">Create team</h2>
        <div className="mb-3 flex flex-col gap-3">
          <InputContainer>
            <Label htmlFor="name">Team name</Label>
            <Input id="name" name="name" placeholder="Team name" />
            {errors.name && (
              <Message variant="error">{errors.name.message}</Message>
            )}
          </InputContainer>
        </div>
        <Button disabled={isLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
