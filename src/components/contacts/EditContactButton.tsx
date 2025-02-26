import { useRef, useState } from "react";

import { HiMiniPencil } from "react-icons/hi2";
import Button from "../Button";
import EditContactForm from "./EditContactForm";

import { useClickOutside } from "../../hooks/useClickOutside";

export default function EditContactButton() {
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
        <HiMiniPencil className="text-md hover:text-primary stroke-1 transition-colors" />
      </Button>

      {isOpen && <EditContactForm />}
    </div>
  );
}
