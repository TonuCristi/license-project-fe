import ContactItem from "./ContactItem";
import Loader from "../../Loader";

import { Contact } from "../../../types/contact.type";

type Props = {
  contacts: Contact[];
  isLoading: boolean;
};

export default function ContactsList({ contacts, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="scrollbar flex flex-col gap-2 overflow-y-scroll pr-2">
      {contacts.map((contact, i) => (
        <ContactItem key={contact.id} index={i} contact={contact} />
      ))}
    </ul>
  );
}
