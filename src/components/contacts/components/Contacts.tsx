import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

import { useFetchContacts } from "../hooks/useFetchContacts";

export default function Contacts() {
  const { getContacts } = useFetchContacts();

  return (
    <div className="border-primary flex h-3/4 w-11/12 flex-col overflow-hidden rounded-lg border-2 bg-blue-50 p-2 sm:w-2/3 md:w-1/2 lg:w-md">
      <div className="mb-4 flex w-full items-center gap-2">
        <ContactsSearchBar getContacts={getContacts} />
        <CreateContactButton />
      </div>
      <ContactsList />
    </div>
  );
}
