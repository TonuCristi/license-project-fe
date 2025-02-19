import { useState } from "react";

import { HiMiniPlusSmall } from "react-icons/hi2";
import Button from "../Button";
import CreateContactForm from "./CreateContactForm";

export default function CreateContactButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button variant="empty" onClick={() => setIsOpen((prev) => !prev)}>
        <HiMiniPlusSmall className="text-primary stroke-1 text-2xl" />
      </Button>

      {isOpen && <CreateContactForm />}
    </div>
  );
}
