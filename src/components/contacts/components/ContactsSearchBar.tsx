import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { contactsSearchBarSchema } from "../../../schemas/contactsSearchBar.schema";

type ContactsSearchBar = z.infer<typeof contactsSearchBarSchema>;

type Props = {
  getContacts: (search: string) => void;
};

export default function ContactsSearchBar({ getContacts }: Props) {
  const methods = useForm<ContactsSearchBar>({
    defaultValues: {
      contactName: "",
    },
    resolver: zodResolver(contactsSearchBarSchema),
  });

  const { watch } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(({ contactName }) => {
      getContacts(contactName ? contactName : "");
    });

    return () => unsubscribe();
  }, [watch, getContacts]);

  return (
    <FormProvider {...methods}>
      <form className="w-full">
        <Input
          name="contactName"
          placeholder="Search your contact..."
          rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
        />
      </form>
    </FormProvider>
  );
}
