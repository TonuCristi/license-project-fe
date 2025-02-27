import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

export default function Contacts() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-blue-50 p-4">
      <div className="mb-4 flex w-full items-center gap-2">
        <ContactsSearchBar />
        <CreateContactButton />
      </div>
      <ContactsList />
    </div>
  );
}
