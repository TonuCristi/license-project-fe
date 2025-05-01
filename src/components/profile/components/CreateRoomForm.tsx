import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Button from "../../Button";
import Message from "../../Message";
import Label from "../../Label";
import Input from "../../input/Input";

import { CreateRoom } from "../../../types/room.type";
import { createRoomSchema } from "../../../schemas/createRoom.schema";
import { useCreateRoom } from "../hooks/useCreateRoom";

export default function CreateRoomForm() {
  const methods = useForm<CreateRoom>({
    resolver: zodResolver(createRoomSchema),
  });
  const { createRoom, isLoading } = useCreateRoom();

  const onSubmit: SubmitHandler<CreateRoom> = (data) =>
    createRoom(data.assistantEmail);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary grid grid-cols-1 gap-2 rounded-lg border-2 p-2 sm:grid-cols-2"
      >
        <InputContainer>
          <Label htmlFor="assistantEmail">Assistant email</Label>
          <Input
            id="assistantEmail"
            name="assistantEmail"
            placeholder="Assistant email..."
          />
          {errors.assistantEmail && (
            <Message variant="error">{errors.assistantEmail.message}</Message>
          )}
        </InputContainer>
        <Button disabled={isLoading} className="sm:row-start-2">
          Add
        </Button>
      </form>
    </FormProvider>
  );
}
