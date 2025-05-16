import { useContext } from "react";

import Loader from "../../Loader";
import ContactListItem from "./ContactListItem";

import { ContactsContext } from "../../../contexts/ContactsContext";

export default function ContactsList() {
  const { contacts, isLoading } = useContext(ContactsContext);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-2">
      {contacts.map((contact, i) => (
        <ContactListItem key={contact.id} index={i} contact={contact} />
      ))}
    </ul>
  );
}
