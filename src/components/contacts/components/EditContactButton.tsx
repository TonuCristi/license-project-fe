import { useContext, useRef, useState } from "react";

import { HiMiniPencil } from "react-icons/hi2";
import Button from "../../Button";
import EditContactForm from "./EditContactForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Contact } from "../../../types/contact.type";
import { useEditContact } from "../hooks/useEditContact";
import { ContactsContext } from "../../../contexts/ContactsContext";

type Props = {
  contact: Contact;
};

export default function EditContactButton({ contact }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { isLoading } = useContext(ContactsContext);
  const { editContact } = useEditContact();

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center"
      >
        <HiMiniPencil className="text-md hover:text-primary stroke-1 transition-colors" />
      </Button>

      {isOpen && (
        <EditContactForm
          contact={contact}
          editContact={editContact}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
