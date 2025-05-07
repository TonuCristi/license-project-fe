import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { ContactsApi } from "../../../services/ContactsApi";
import { CreateContact } from "../../../types/contact.type";
import { mapContact } from "../../../utlis/mapContact";
import { ContactsContext } from "../../../contexts/ContactsContext";

export function useCreateContact() {
  const { setContacts } = useContext(ContactsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createContact(contact: CreateContact) {
    setIsLoading(true);
    ContactsApi.createContact(contact)
      .then((res) => {
        const newContact = mapContact(res);
        setContacts((prev) => [...prev, newContact]);
        toast.success("Contact created successfully!");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createContact, isLoading };
}
