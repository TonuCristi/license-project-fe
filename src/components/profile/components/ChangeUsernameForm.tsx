import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import Button from "../../Button";

import { changeUsernameSchema } from "../../../schemas/changeUsername.schema";
import { UserContext } from "../../../contexts/UserContext";
import { ChangeUsername } from "../../../types/user.type";
import { useChangeUsername } from "../hooks/useChangeUsername";

export default function ChangeUsernameForm() {
  const { user } = useContext(UserContext);
  const methods = useForm<ChangeUsername>({
    defaultValues: {
      username: user.username,
    },
    resolver: zodResolver(changeUsernameSchema),
  });
  const { changeUsername, isLoading } = useChangeUsername();

  const onSubmit: SubmitHandler<ChangeUsername> = (data) =>
    changeUsername(data.username);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary grid grid-cols-2 gap-2 rounded-lg border-2 p-2"
      >
        <InputContainer key="username">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" placeholder="Username..." />
          {errors.username && (
            <Message variant="error">{errors.username.message}</Message>
          )}
        </InputContainer>
        <Button disabled={isLoading} className="row-start-2">
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
