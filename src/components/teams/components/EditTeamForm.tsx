import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../Button";
import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";

import { EditTeam, TeamWithoutProjectTeamId } from "../../../types/team.type";
import { teamFormSchema } from "../../../schemas/teamForm.schema";

type Props = {
  team: TeamWithoutProjectTeamId;
  editTeam: (teamId: string, newEditedTeam: EditTeam) => void;
  isEditLoading: boolean;
};

export default function EditTeamForm({ team, editTeam, isEditLoading }: Props) {
  const methods = useForm<EditTeam>({
    defaultValues: {
      ...team,
    },
    resolver: zodResolver(teamFormSchema),
  });

  const onSubmit: SubmitHandler<EditTeam> = (data) => editTeam(team.id, data);

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
          <InputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Name" />
            {errors.name && (
              <Message variant="error">{errors.name.message}</Message>
            )}
          </InputContainer>
        </div>
        <Button disabled={isEditLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
