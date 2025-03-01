import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import HidePasswordInput from "../../input/HidePasswordInput";

import { loginSchema } from "../../../schemas/login.schema";
import { Link } from "react-router";
import Button from "../../Button";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <InputContainer key="email">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="Email..." />
          {errors.email && (
            <Message variant="error">{errors.email.message}</Message>
          )}
        </InputContainer>

        <HidePasswordInput
          id="password"
          name="password"
          placeholder="Password..."
          htmlFor="password"
          label="Password"
          error={errors.password && errors.password.message}
        />

        <Button className="mt-2">Logi</Button>

        <Link
          to="/forgot-password"
          className="self-center text-xs font-semibold"
        >
          Forgot password?
        </Link>
      </form>
    </FormProvider>
  );
}
