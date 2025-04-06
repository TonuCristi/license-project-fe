import { useContext } from "react";

import ContactItem from "./ContactItem";
import Loader from "../../Loader";

import { ContactsContext } from "../../../contexts/ContactsContext";

export default function ContactsList() {
  const { contacts, isContactsLoading } = useContext(ContactsContext);

  if (isContactsLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="scrollbar flex h-full flex-col gap-2 pr-2">
      {contacts.map((contact, i) => (
        <ContactItem key={contact.id} index={i} contact={contact} />
      ))}
    </ul>
  );
}
