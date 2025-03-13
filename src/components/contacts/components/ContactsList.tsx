import ContactItem from "./ContactItem";
import Loader from "../../Loader";

import { Contact, EditContact } from "../../../types/contact.type";

type Props = {
  deleteContact: (contactId: string) => void;
  editContact: (contactId: string, editedContactChanges: EditContact) => void;
  contacts: Contact[];
  isLoading: boolean;
  isContactsLoading: boolean;
};

export default function ContactsList({
  deleteContact,
  editContact,
  contacts,
  isLoading,
  isContactsLoading,
}: Props) {
  if (isContactsLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="scrollbar flex flex-col gap-2 overflow-y-scroll pr-2">
      {contacts.map((contact, i) => (
        <ContactItem
          key={contact.id}
          index={i}
          contact={contact}
          isLoading={isLoading}
          deleteContact={deleteContact}
          editContact={editContact}
        />
      ))}
    </ul>
  );
}
