import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

import InputContainer from "../../../input/InputContainer";
import Label from "../../../Label";
import Input from "../../../input/Input";
import Message from "../../../Message";
import Button from "../../../Button";

import { ForgotPassword } from "../../../../types/user.type";
import { forgotPasswordFormSchema } from "../../../../schemas/forgotPasswordForm.schema";
import { useForgotPassword } from "../../hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const methods = useForm<ForgotPassword>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const { forgotPassword, isLoading } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPassword> = (data) =>
    forgotPassword(data.email);

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
          <p className="font-semibold">Forgot your password?</p>
          <p>
            No problem — just enter your email below and we’ll send you a secure
            link to reset it.
          </p>
        </div>

        <div className="mb-2">
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Email..." />
            {errors.email && (
              <Message variant="error">{errors.email.message}</Message>
            )}
          </InputContainer>
        </div>

        <Button disabled={isLoading} className="mb-2">
          Request reset link
        </Button>

        <Link to="/login" className="self-center text-xs font-semibold">
          Back to login
        </Link>
      </form>
    </FormProvider>
  );
}
