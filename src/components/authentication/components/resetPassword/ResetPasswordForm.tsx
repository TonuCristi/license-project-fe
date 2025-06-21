import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router";

import HidePasswordInput from "../../../input/HidePasswordInput";
import Button from "../../../Button";

import { ChangePassword } from "../../../../types/user.type";
import { useResetPassword } from "../../hooks/useResetPassword";
import { changePasswordSchema } from "../../../../schemas/changePasword.schema";

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

export default function ResetPasswordForm() {
  const methods = useForm<ChangePassword>({
    defaultValues: { newPassword: "", newRepeatPassword: "", oldPassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { resetPassword, isLoading } = useResetPassword();

  const onSubmit: SubmitHandler<ChangePassword> = (data) => {
    if (token) {
      resetPassword(token, data, () => methods.reset());
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-4/5 xs:w-80 flex w-11/12 flex-col gap-2 rounded-lg border-2 p-4"
      >
        <div className="flex flex-col gap-2">
          <p className="font-semibold">
            Choose a new password for your account.
          </p>
          <p>Make sure it’s strong and something you haven’t used before.</p>
        </div>

        <div className="mb-2 flex flex-col gap-2">
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
        </div>

        <Button disabled={isLoading} className="mb-2">
          Reset password
        </Button>

        <Link to="/login" className="self-center text-xs font-semibold">
          Back to login
        </Link>
      </form>
    </FormProvider>
  );
}
