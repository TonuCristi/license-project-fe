import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import InputContainer from "../../../input/InputContainer";
import Label from "../../../Label";
import Input from "../../../input/Input";
import Message from "../../../Message";
import HidePasswordInput from "../../../input/HidePasswordInput";
import Button from "../../../Button";
import { Link } from "react-router";

import { loginSchema } from "../../../../schemas/login.schema";
import { useLogin } from "../../hooks/useLogin";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: "ddd@eee.fff",
      password: "P@rola1234",
    },
    resolver: zodResolver(loginSchema),
  });
  const { login, isLoading } = useLogin();

  const onSubmit: SubmitHandler<LoginForm> = (data) => login(data);

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

        <Link to="/forgot-password" className="self-end text-xs font-semibold">
          Forgot password?
        </Link>

        <Button className="mt-2" disabled={isLoading}>
          Login
        </Button>

        <Link to="/register" className="self-center text-xs font-semibold">
          Don't have an account? Register
        </Link>
      </form>
    </FormProvider>
  );
}
