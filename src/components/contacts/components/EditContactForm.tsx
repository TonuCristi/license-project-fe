import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../../input/Input";
import Label from "../../Label";
import Message from "../../Message";
import Button from "../../Button";
import InputContainer from "../../input/InputContainer";

import { contactFormSchema } from "../../../schemas/contactForm.schema";
import { Contact, EditContact } from "../../../types/contact.type";
import { useEditContact } from "../hooks/useEditContact";

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
  {
    label: "Description",
    id: "description",
    name: "description",
    placeholder: "Description...",
  },
] as const;

type Props = {
  contact: Contact;
};

export default function EditContactForm({ contact }: Props) {
  const methods = useForm<EditContact>({
    defaultValues: {
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      description: contact.description,
    },
    resolver: zodResolver(contactFormSchema),
  });
  const { editContact, isLoading } = useEditContact();

  const onSubmit: SubmitHandler<EditContact> = (data) =>
    editContact(contact.id, data);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-primary xxs:w-64 absolute top-11/12 right-0 z-50 mt-3 flex w-52 flex-col rounded-xl border-2 bg-white p-3"
      >
        <h2 className="mb-1 text-lg font-medium">Edit contact</h2>
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
        </div>
        <Button disabled={isLoading}>Save</Button>
      </form>
    </FormProvider>
  );
}
