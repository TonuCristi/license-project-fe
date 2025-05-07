import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { ContactsContext } from "../../../contexts/ContactsContext";
import { EditContact } from "../../../types/contact.type";
import { mapContact } from "../../../utlis/mapContact";
import { ContactsApi } from "../../../services/ContactsApi";

export function useEditContact() {
  const { contacts, setContacts } = useContext(ContactsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function editContact(contactId: string, editedContactChanges: EditContact) {
    setIsLoading(true);
    ContactsApi.editContact(contactId, editedContactChanges)
      .then((res) => {
        const editedContact = mapContact(res);
        const contactIndex = contacts.findIndex(
          (contact) => contact.id === contactId,
        );

        setContacts((prev) => {
          const filteredContacts = prev.filter(
            (contact) => contact.id !== contactId,
          );
          return [
            ...filteredContacts.slice(0, contactIndex),
            editedContact,
            ...filteredContacts.slice(contactIndex, filteredContacts.length),
          ];
        });
        toast.success("Contact edited successfully!");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editContact, isLoading };
}
