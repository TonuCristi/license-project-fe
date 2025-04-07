import { useCallback, useContext } from "react";

import { ContactsApi } from "../../../services/ContactsApi";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { mapContact } from "../../../utlis/mapContact";

export function useFetchContacts() {
  const { isContactsLoading, setContacts, setIsContactsLoading } =
    useContext(ContactsContext);

  const getContacts = useCallback(
    function (search: string) {
      ContactsApi.getContacts(search)
        .then((res) => {
          const contacts = res.map((contact) => mapContact(contact));
          setContacts(contacts);
        })
        .finally(() => setIsContactsLoading(false));
    },
    [setContacts, setIsContactsLoading],
  );

  return { getContacts, isContactsLoading };
}
