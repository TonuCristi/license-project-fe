import { useContext, useEffect, useRef } from "react";

import ContactListItem from "./ContactListItem";

import { ContactsContext } from "../../../contexts/ContactsContext";
import { useFetchContacts } from "../hooks/useFetchContacts";
import { useFormContext } from "react-hook-form";

export default function ContactsList() {
  const { contacts, offset, isLoading, setOffset } =
    useContext(ContactsContext);
  const { getContacts } = useFetchContacts();
  const listRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    const options = {
      root: listRef.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();
        getContacts(watch("value"), offset, 15, controllerRef.current);
        setOffset((prev) => prev + 1);
      }
    }, options);

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [contacts.length, watch, setOffset, getContacts]);

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
