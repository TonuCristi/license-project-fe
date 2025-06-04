import { useContext, useEffect, useRef, useState } from "react";

import ContactListItem from "./ContactListItem";

import { ContactsContext } from "../../../contexts/ContactsContext";
import { useFetchContacts } from "../hooks/useFetchContacts";
import { useFormContext } from "react-hook-form";

export default function ContactsList() {
  const { contacts } = useContext(ContactsContext);
  const { getContacts } = useFetchContacts();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const isLoading = useRef<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const { watch } = useFormContext();

  useEffect(() => {
    isLoading.current = false;

    const options = {
      root: listRef.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading.current) {
        getContacts(watch("value"), offset, 15);
        setOffset((prev) => prev + 1);
        isLoading.current = true;
      }
    }, options);

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [contacts.length, watch]);

  return (
    <ul
      ref={listRef}
      className="scrollbar flex h-full flex-col gap-2 overflow-y-auto pr-2"
    >
      {contacts.map((contact, i) => (
        <ContactListItem key={contact.id} index={i} contact={contact} />
      ))}
      <li ref={itemRef} className="p-0.5"></li>
    </ul>
  );
}
