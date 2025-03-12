import { useRef, useState } from "react";

import { HiMiniPlusSmall } from "react-icons/hi2";
import Button from "../../Button";
import CreateContactForm from "./CreateContactForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { CreateContact } from "../../../types/contact.type";

type Props = {
  createContact: (contact: CreateContact) => void;
  isLoading: boolean;
};

export default function CreateContactButton({
  createContact,
  isLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center"
      >
        <HiMiniPlusSmall className="text-primary stroke-1 text-2xl" />
      </Button>

      {isOpen && (
        <CreateContactForm
          createContact={createContact}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
