import { useCallback, useContext } from "react";

import { ContactsApi } from "../../../services/ContactsApi";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { mapContact } from "../../../utlis/mapContact";

export function useFetchContacts() {
  const { setContacts, setIsLoading } = useContext(ContactsContext);

  const getContacts = useCallback(
    function (
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      setIsLoading(true);
      ContactsApi.getContacts(search, offset, perPage, controller)
        .then((res) => {
          const contacts = res.map((contact) => mapContact(contact));
          setContacts((prev) => [...prev, ...contacts]);
        })
        .catch((error) => {
          if (error.name === "CanceledError") {
            return;
          }

          console.log(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    },
    [setContacts, setIsLoading],
  );

  return { getContacts };
}
