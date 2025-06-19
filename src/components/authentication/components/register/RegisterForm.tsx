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

import { useRegister } from "../../hooks/useRegister";
import { Register } from "../../../../types/user.type";
import { registerFormSchema } from "../../../../schemas/registerForm.schema";

const options = [
  { value: "chief", text: "Chief" },
  { value: "assistant", text: "Assistant" },
];

const inputs = [
  {
    label: "Username",
    id: "username",
    name: "username",
    placeholder: "Username...",
  },
  {
    label: "Email",
    id: "email",
    name: "email",
    placeholder: "Email...",
  },
] as const;

export default function RegisterForm() {
  const methods = useForm<Register>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormSchema),
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
        {inputs.map(({ label, id, name, placeholder }) => (
          <InputContainer key={id}>
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={name} placeholder={placeholder} />
            {errors[name] && (
              <Message variant="error">{errors[name].message}</Message>
            )}
          </InputContainer>
        ))}

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
          {errors.role && (
            <Message variant="error">{errors.role.message}</Message>
          )}
        </InputContainer>

        <Button disabled={isLoading} className="mt-2">
          Register
        </Button>

        <Link to="/login" className="self-center text-xs font-semibold">
          Already have an account? Login
        </Link>
      </form>
    </FormProvider>
  );
}
