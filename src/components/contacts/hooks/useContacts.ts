import { useEffect, useState } from "react";

import {
  Contact,
  CreateContact,
  EditContact,
} from "../../../types/contact.type";
import { ContactsApi } from "../../../services/ContactsApi";
import { mapContact } from "../../../utlis/mapContact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  function getContacts(search: string) {
    ContactsApi.getContacts(search)
      .then((res) => {
        const contacts = res.map((contact) => mapContact(contact));
        setContacts(contacts);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsContactsLoading(false));
  }

  function createContact(contact: CreateContact) {
    setIsLoading(true);
    ContactsApi.createContact(contact)
      .then((res) => {
        const contact = mapContact(res);
        setContacts((prev) => [...prev, contact]);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  function deleteContact(contactId: string) {
    setIsLoading(true);
    ContactsApi.deleteContact(contactId)
      .then(() => {
        setContacts((prev) => [
          ...prev.filter((contact) => contact.id !== contactId),
        ]);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  function editContact(contactId: string, editedContactChanges: EditContact) {
    setIsLoading(true);
    ContactsApi.editContact(contactId, editedContactChanges)
      .then((res) => {
        const contact = mapContact(res);
        const contactIndex = contacts.findIndex(
          (contact) => contact.id === contactId,
        );

        setContacts((prev) => {
          const filteredContacts = prev.filter(
            (contact) => contact.id !== contactId,
          );
          return [
            ...filteredContacts.slice(0, contactIndex),
            contact,
            ...filteredContacts.slice(contactIndex, filteredContacts.length),
          ];
        });
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getContacts("");
  }, []);

  return {
    getContacts,
    createContact,
    deleteContact,
    editContact,
    contacts,
    isContactsLoading,
    isLoading,
    error,
  };
}
