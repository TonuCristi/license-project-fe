import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

import { useFetchContacts } from "../hooks/useFetchContacts";

export default function Contacts() {
  const { getContacts } = useFetchContacts();

  return (
    <div className="flex h-full flex-col overflow-hidden p-4">
      <div className="mb-4 flex w-full items-center gap-2">
        <ContactsSearchBar getContacts={getContacts} />
        <CreateContactButton />
      </div>
      <ContactsList />
    </div>
  );
}
