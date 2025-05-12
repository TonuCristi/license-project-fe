import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../Button";
import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { EditTeam } from "../../../types/team.type";
import { teamFormSchema } from "../../../schemas/teamForm.schema";
import { useEditTeam } from "../hooks/useEditTeam";

export default function EditTeamForm() {
  const { selectedTeam } = useContext(TeamsContext);
  const methods = useForm<EditTeam>({
    defaultValues: {
      name: selectedTeam ? selectedTeam.name : "",
    },
    resolver: zodResolver(teamFormSchema),
  });
  const { editTeam, isLoading } = useEditTeam();

  const onSubmit: SubmitHandler<EditTeam> = (data) => editTeam(data);

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
        <h2 className="mb-1 text-lg font-medium">Edit team</h2>
        <div className="mb-3 flex flex-col gap-3">
          <InputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Name" />
            {errors.name && (
              <Message variant="error">{errors.name.message}</Message>
            )}
          </InputContainer>
        </div>
        <Button disabled={isLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
