import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import Input from "../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { contactsSearchBarSchema } from "../../schemas/contactsSearchBar.schema";

type ContactsSearchBar = z.infer<typeof contactsSearchBarSchema>;

export default function ContactsSearchBar() {
  const methods = useForm<ContactsSearchBar>({
    resolver: zodResolver(contactsSearchBarSchema),
  });

  const onSubmit: SubmitHandler<ContactsSearchBar> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <Input
          name="contactName"
          placeholder="Search your contact..."
          rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
        />
      </form>
    </FormProvider>
  );
}
