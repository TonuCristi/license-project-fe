import { useCallback, useContext, useEffect } from "react";

import { ContactsApi } from "../../../services/ContactsApi";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { mapContact } from "../../../utlis/mapContact";

export function useFetchContacts() {
  const { setContacts, setIsContactsLoading } = useContext(ContactsContext);

  const getContacts = useCallback(
    function (search: string) {
      ContactsApi.getContacts(search)
        .then((res) => {
          const contacts = res.map((contact) => mapContact(contact));
          setContacts(contacts);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsContactsLoading(false));
    },
    [setContacts, setIsContactsLoading],
  );

  useEffect(() => {
    getContacts("");
  }, [getContacts]);

  return { getContacts };
}
