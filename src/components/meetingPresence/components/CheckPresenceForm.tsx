import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CheckPresence } from "../../../types/meetingAttendance.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router";

import InputContainer from "../../input/InputContainer";
import Label from "../../Label";
import Input from "../../input/Input";
import Message from "../../Message";
import Button from "../../Button";

import { useCheckPresence } from "../hooks/useCheckPresence";
import { checkPresenceFormSchema } from "../../../schemas/checkPresenceForm.schema";

export default function CheckPresenceForm() {
  const methods = useForm<CheckPresence>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(checkPresenceFormSchema),
  });

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { checkPresence, isLoading } = useCheckPresence();

  const onSubmit: SubmitHandler<CheckPresence> = (data) => {
    if (token) {
      checkPresence(token, data.email);
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
        <p>Enter your email below to confirm your presence.</p>

        <div className="mb-2">
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Email..." />
            {errors.email && (
              <Message variant="error">{errors.email.message}</Message>
            )}
          </InputContainer>
        </div>

        <Button disabled={isLoading}>Confirm presence</Button>
      </form>
    </FormProvider>
  );
}
