import { useState } from "react";

import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

import { FormProvider, useForm } from "react-hook-form";
import { SearchBar } from "../../../types/searchBar.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchBarSchema } from "../../../schemas/searchBar.schema";
import ContactsProvider from "../../../contexts/ContactsContext";

export default function Contacts() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(searchBarSchema),
  });
  const [offset, setOffset] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <ContactsProvider>
      <FormProvider {...methods}>
        <div className="border-primary flex h-3/4 w-11/12 flex-col gap-2 overflow-hidden rounded-lg border-2 bg-blue-50 p-2 sm:w-2/3 md:w-1/2 lg:w-md">
          <h2 className="text-lg font-medium">Contacts</h2>
          <div className="flex w-full items-center gap-2">
            <ContactsSearchBar
              setOffset={setOffset}
              setIsSearching={setIsSearching}
            />
            <CreateContactButton />
          </div>
          <ContactsList
            offset={offset}
            isSearching={isSearching}
            setOffset={setOffset}
            setIsSearching={setIsSearching}
          />
        </div>
      </FormProvider>
    </ContactsProvider>
  );
}
