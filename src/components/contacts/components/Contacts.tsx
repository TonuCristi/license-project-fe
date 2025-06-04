import ContactsList from "./ContactsList";
import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

export default function Contacts() {
  return (
    <div className="border-primary flex h-3/4 w-11/12 flex-col gap-2 overflow-hidden rounded-lg border-2 bg-blue-50 p-2 sm:w-2/3 md:w-1/2 lg:w-md">
      <h2 className="text-lg font-medium">Contacts</h2>
      <div className="flex w-full items-center gap-2">
        <ContactsSearchBar />
        <CreateContactButton />
      </div>
      <ContactsList />
    </div>
  );
}
