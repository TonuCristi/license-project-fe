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
  isLoading: boolean;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  isLoading: false,
  setContacts: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        setContacts,
        setIsLoading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
