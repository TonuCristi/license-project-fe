import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Contact } from "../types/contact.type";

type ContactsContext = {
  contacts: Contact[];
  setContacts: Dispatch<SetStateAction<Contact[]>>;
};

export const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  setContacts: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        setContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
