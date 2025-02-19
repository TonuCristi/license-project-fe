import ContactsSearchBar from "./ContactsSearchBar";
import CreateContactButton from "./CreateContactButton";

export default function Contacts() {
  return (
    <div className="bg-blue-50 p-4">
      <div className="flex w-full items-center gap-2">
        <ContactsSearchBar />
        <CreateContactButton />
      </div>
    </div>
  );
}
