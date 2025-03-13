import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { contactFormSchema } from "../../../schemas/contactForm.schema";
import { CreateContact } from "../../../types/contact.type";

const inputs = [
  {
    value: "Name",
    id: "name",
    name: "name",
    placeholder: "Name...",
  },
  {
    value: "Phone number",
    id: "phoneNumber",
    name: "phoneNumber",
    placeholder: "Phone number...",
  },
  {
    value: "Description",
    id: "description",
    name: "description",
    placeholder: "Description...",
  },
] as const;

type Props = {
  createContact: (contact: CreateContact) => void;
  isLoading: boolean;
};

export default function CreateContactForm({ createContact, isLoading }: Props) {
  const methods = useForm<CreateContact>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<CreateContact> = (data) => createContact(data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary absolute top-full right-0 z-50 mt-3 flex w-80 flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Create contact</h2>
        <div className="mb-3 flex flex-col gap-3">
          {inputs.map(({ value, id, name, placeholder }) => (
            <InputContainer key={id}>
              <Label htmlFor={id}>{value}</Label>
              <Input id={id} name={name} placeholder={placeholder} />
              {errors[name] && (
                <Message variant="error">{errors[name].message}</Message>
              )}
            </InputContainer>
          ))}
        </div>
        <Button disabled={isLoading}>Create</Button>
      </form>
    </FormProvider>
  );
}
