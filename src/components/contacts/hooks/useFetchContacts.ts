import { useCallback, useContext } from "react";

import { ContactsApi } from "../../../services/ContactsApi";
import { ContactsContext } from "../../../contexts/ContactsContext";
import { mapContact } from "../../../utlis/mapContact";

export function useFetchContacts() {
  const { setContacts } = useContext(ContactsContext);

  const getContacts = useCallback(
    function (
      search: string,
      offset: number,
      perPage: number,
      controller: AbortController,
    ) {
      ContactsApi.getContacts(search, offset, perPage, controller).then(
        (res) => {
          const contacts = res.map((contact) => mapContact(contact));
          setContacts((prev) => [...prev, ...contacts]);
        },
      );
    },
    [setContacts],
  );

  return { getContacts };
}
