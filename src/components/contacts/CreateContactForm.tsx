import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../input/Input";
import Label from "../Label";
import Message from "../Message";

import { createContactFormSchema } from "../../schemas/createContactForm.schema";
import Button from "../Button";

type CreateContactForm = z.infer<typeof createContactFormSchema>;

export default function CreateContactForm() {
  const methods = useForm<CreateContactForm>({
    resolver: zodResolver(createContactFormSchema),
  });

  const onSubmit: SubmitHandler<CreateContactForm> = (data) => {
    console.log(data);
  };

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary absolute top-full right-0 mt-3 flex w-80 flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Create contact</h2>
        <div className="mb-3 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Name..." />
            {errors.name && (
              <Message type="error">{errors.name.message}</Message>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number..."
            />
            {errors.phoneNumber && (
              <Message type="error">{errors.phoneNumber.message}</Message>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description..."
            />
            {errors.description && (
              <Message type="error">{errors.description.message}</Message>
            )}
          </div>
        </div>

        <Button>Create</Button>
      </form>
    </FormProvider>
  );
}
