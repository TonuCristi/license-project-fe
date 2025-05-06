import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { ContactsContext } from "../../../contexts/ContactsContext";
import { ContactsApi } from "../../../services/ContactsApi";

export function useDeleteContact() {
  const { setContacts } = useContext(ContactsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteContact(contactId: string) {
    setIsLoading(true);
    ContactsApi.deleteContact(contactId)
      .then(() => {
        setContacts((prev) => [
          ...prev.filter((contact) => contact.id !== contactId),
        ]);
        toast.success("Contact deleted successfully!");
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteContact, isLoading };
}
