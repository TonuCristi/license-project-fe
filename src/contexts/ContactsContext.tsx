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
  isContactsLoading: boolean;
  isLoading: boolean;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  setIsContactsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  isContactsLoading: true,
  isLoading: false,
  setContacts: () => undefined,
  setIsContactsLoading: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isContactsLoading,
        isLoading,
        setContacts,
        setIsContactsLoading,
        setIsLoading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
