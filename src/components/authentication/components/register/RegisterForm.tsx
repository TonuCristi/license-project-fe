import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Link } from "react-router";
import InputContainer from "../../../input/InputContainer";
import Label from "../../../Label";
import Input from "../../../input/Input";
import Message from "../../../Message";
import HidePasswordInput from "../../../input/HidePasswordInput";
import Select from "../../../Select";
import Button from "../../../Button";

import { registerSchema } from "../../../../schemas/register.schema";
import { useRegister } from "../../hooks/useRegister";
import { Register } from "../../../../types/user.type";

const options = [
  { value: "chief", text: "Chief" },
  { value: "assistant", text: "Assistant" },
];

export default function RegisterForm() {
  const methods = useForm<Register>({
    resolver: zodResolver(registerSchema),
  });
  const { register, isLoading } = useRegister();

  const onSubmit: SubmitHandler<Register> = (data) => register(data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <InputContainer>
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" placeholder="Username..." />
          {errors.username && (
            <Message variant="error">{errors.username.message}</Message>
          )}
        </InputContainer>

        <InputContainer>
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

        <InputContainer>
          <Label>Role</Label>
          <Select
            name="role"
            placeholder="Select your role"
            options={options}
          />
        </InputContainer>

        <Button className="mt-2" disabled={isLoading}>
          Register
        </Button>

        <Link to="/login" className="self-center text-xs font-semibold">
          Already have an account? Login
        </Link>
      </form>
    </FormProvider>
  );
}
