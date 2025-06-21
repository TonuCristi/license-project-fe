import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../Button";
import HidePasswordInput from "../../input/HidePasswordInput";

import { changePasswordSchema } from "../../../schemas/changePasword.schema";
import { ChangePassword } from "../../../types/user.type";
import { useChangePassword } from "../hooks/useChangePassword";

const inputs = [
  {
    label: "New password",
    id: "newPassword",
    name: "newPassword",
    placeholder: "New password...",
  },
  {
    label: "Repeat new password",
    id: "newRepeatPassword",
    name: "newRepeatPassword",
    placeholder: "Repeat new password...",
  },
  {
    label: "Old password",
    id: "oldPassword",
    name: "oldPassword",
    placeholder: "Old password...",
  },
] as const;

export default function ChangePasswordForm() {
  const methods = useForm<ChangePassword>({
    defaultValues: { newPassword: "", newRepeatPassword: "", oldPassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });
  const { changePasword, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<ChangePassword> = (data) => changePasword(data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary grid grid-cols-1 items-start gap-2 rounded-lg border-2 p-2 sm:grid-cols-2"
      >
        {inputs.map(({ label, id, name, placeholder }) => (
          <HidePasswordInput
            key={id}
            id={id}
            name={name}
            placeholder={placeholder}
            htmlFor={name}
            label={label}
            error={errors[name] && errors[name].message}
          />
        ))}
        <Button disabled={isLoading} className="sm:row-start-3">
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
