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
  offset: number;
  isLoading: boolean;
  setContacts: Dispatch<SetStateAction<Contact[]>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const ContactsContext = createContext<ContactsContext>({
  contacts: [],
  offset: 0,
  isLoading: false,
  setContacts: () => undefined,
  setOffset: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function ContactsProvider({ children }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        offset,
        isLoading,
        setContacts,
        setOffset,
        setIsLoading,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
