import { useRef, useState } from "react";

import { HiMiniPencil } from "react-icons/hi2";
import Button from "../../Button";
import EditContactForm from "./EditContactForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Contact } from "../../../types/contact.type";

type Props = {
  contact: Contact;
};

export default function EditContactButton({ contact }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef}>
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center"
      >
        <HiMiniPencil className="text-md hover:text-primary stroke-1 transition-colors" />
      </Button>

      {isOpen && <EditContactForm contact={contact} />}
    </div>
  );
}
