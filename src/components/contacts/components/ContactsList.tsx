import { useEffect, useRef } from "react";

import ContactItem from "./ContactItem";

import { Contact } from "../../../types/contact.type";

type Props = {
  contacts: Contact[];
};

export default function ContactsList({ contacts }: Props) {
  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleIntersection() {}

    const options = {
      root: rootRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (rootRef.current?.lastChild) {
      observer.observe(rootRef.current.lastChild as Element);
    }
  }, []);

  return (
    <ul
      ref={rootRef}
      className="scrollbar flex flex-col gap-2 overflow-y-scroll pr-2"
    >
      {contacts.map((contact, i) => (
        <ContactItem key={contact.id} index={i} contact={contact} />
      ))}
    </ul>
  );
}
