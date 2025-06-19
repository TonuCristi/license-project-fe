import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { ContactsApi } from "../../../services/ContactsApi";
import { CreateContact } from "../../../types/contact.type";
import { mapContact } from "../../../utlis/mapContact";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { PER_PAGE } from "../../../constants/contacts";

export function useCreateContact() {
  const { contacts, setContacts } = useContext(ContactsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createContact(contact: CreateContact) {
    setIsLoading(true);
    ContactsApi.createContact(contact)
      .then((res) => {
        const newContact = mapContact(res.newContact);
        const contactsCount = res.contactsCount;
        setContacts((prev) => {
          if (prev.length < PER_PAGE || contactsCount === contacts.length) {
            return [...prev, newContact];
          }

          return prev;
        });
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createContact, isLoading };
}
