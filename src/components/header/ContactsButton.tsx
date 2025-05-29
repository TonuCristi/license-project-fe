import { useState } from "react";

import Button from "../Button";
import Contacts from "../contacts/components/Contacts";
import Overlay from "../Overlay";
import NavbarItem from "./NavbarItem";
import { HiMiniXMark } from "react-icons/hi2";

export default function ContactsButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <NavbarItem>
      <Button variant="empty" onClick={() => setIsOpen(true)}>
        Contacts
      </Button>

      {isOpen && (
        <Overlay>
          <Button
            variant="empty"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5"
          >
            <HiMiniXMark className="text-primary stroke-1 text-xl" />
          </Button>
          <Contacts />
        </Overlay>
      )}
    </NavbarItem>
  );
}
