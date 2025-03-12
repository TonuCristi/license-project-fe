import { useEffect, useState } from "react";

import { Contact } from "../../../types/contact.type";
import { ContactsApi } from "../../../services/ContactsApi";
import { mapContact } from "../../../utlis/mapContact";

export const CONTACTS_LIMIT = 30;

export function useFetchContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  function getContacts(search: string) {
    ContactsApi.getContacts(search)
      .then((res) => {
        const contacts = res.map((contact) => mapContact(contact));
        setContacts(contacts);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getContacts("");
  }, []);

  return {
    getContacts,
    contacts,
    isLoading,
    setContacts,
    setIsLoading,
  };
}
