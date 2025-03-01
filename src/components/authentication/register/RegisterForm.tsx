import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import HidePasswordInput from "../../input/HidePasswordInput";
import Button from "../../Button";
import Select from "../../Select";

import { Link } from "react-router";
import { registerSchema } from "../../../schemas/register.schema";

const options = [
  { value: "chief", text: "Chief" },
  { value: "assistant", text: "Assistant" },
];

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const methods = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
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

        <InputContainer>
          <Label>Role</Label>
          <Select
            name="role"
            placeholder="Select your role"
            options={options}
          />
        </InputContainer>

        <Button className="mt-2">Register</Button>

        <Link to="/login" className="self-center text-xs font-semibold">
          Already have an account? Login
        </Link>
      </form>
    </FormProvider>
  );
}
