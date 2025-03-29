import { useContext } from "react";
import toast from "react-hot-toast";

import { ContactsApi } from "../../../services/ContactsApi";
import { CreateContact } from "../../../types/contact.type";
import { mapContact } from "../../../utlis/mapContact";
import { ContactsContext } from "../../../contexts/ContactsContext";

export function useCreateContact() {
  const { setContacts, setIsLoading } = useContext(ContactsContext);

  function createContact(contact: CreateContact) {
    setIsLoading(true);
    ContactsApi.createContact(contact)
      .then((res) => {
        const contact = mapContact(res);
        setContacts((prev) => [...prev, contact]);
        toast.success("Contact created successfully!");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createContact };
}
