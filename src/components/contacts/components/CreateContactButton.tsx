import { useRef, useState } from "react";

import Button from "../../Button";
import CreateContactForm from "./CreateContactForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function CreateContactButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Add contact
      </Button>

      {isOpen && <CreateContactForm />}
    </div>
  );
}
