import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { contactFormSchema } from "../../../schemas/contactForm.schema";
import { CreateContact } from "../../../types/contact.type";
import { useCreateContact } from "../hooks/useCreateContact";
import Textarea from "../../Textarea";

const inputs = [
  {
    label: "Name",
    id: "name",
    name: "name",
    placeholder: "Name...",
  },
  {
    label: "Phone number",
    id: "phoneNumber",
    name: "phoneNumber",
    placeholder: "Phone number...",
  },
] as const;

export default function CreateContactForm() {
  const methods = useForm<CreateContact>({
    defaultValues: {
      name: "",
      phoneNumber: "",
      description: "",
    },
    resolver: zodResolver(contactFormSchema),
  });
  const { createContact, isLoading } = useCreateContact();

  const onSubmit: SubmitHandler<CreateContact> = (data) => createContact(data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary absolute top-full right-0 z-50 mt-3 flex w-full flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Create contact</h2>
        <div className="mb-3 flex flex-col gap-3">
          {inputs.map(({ label, id, name, placeholder }) => (
            <InputContainer key={id}>
              <Label htmlFor={id}>{label}</Label>
              <Input id={id} name={name} placeholder={placeholder} />
              {errors[name] && (
                <Message variant="error">{errors[name].message}</Message>
              )}
            </InputContainer>
          ))}
          <InputContainer>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Description..."
              className="scrollbar"
            />
            {errors.description && (
              <Message variant="error">{errors.description.message}</Message>
            )}
          </InputContainer>
        </div>
        <Button disabled={isLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
