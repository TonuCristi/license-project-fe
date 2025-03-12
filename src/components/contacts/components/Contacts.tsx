import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

import { useContacts } from "../hooks/useContacts";

export default function Contacts() {
  const { getContacts, createContact, contacts, isContactsLoading, isLoading } =
    useContacts();

  return (
    <div className="flex h-full flex-col overflow-hidden bg-blue-50 p-4">
      <div className="mb-4 flex w-full items-center gap-2">
        <ContactsSearchBar getContacts={getContacts} />
        <CreateContactButton
          createContact={createContact}
          isLoading={isLoading}
        />
      </div>
      <ContactsList contacts={contacts} isLoading={isContactsLoading} />
    </div>
  );
}
