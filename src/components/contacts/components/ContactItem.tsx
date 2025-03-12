import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown, HiMiniXMark } from "react-icons/hi2";
import Button from "../../Button";
import EditContactButton from "./EditContactButton";

import { Contact, EditContact } from "../../../types/contact.type";

type Props = {
  index: number;
  contact: Contact;
  isLoading: boolean;
  deleteContact: (contactId: string) => void;
  editContact: (contactId: string, editedContactChanges: EditContact) => void;
};

export default function ContactItem({
  index,
  contact,
  isLoading,
  deleteContact,
  editContact,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { name, phoneNumber, description } = contact;

  return (
    <li className="border-primary flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-1">
      <div className="flex items-center gap-2">
        <span>{`${index + 1}.)`}</span>
        <p className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
          {name}
        </p>
        <Button
          variant="empty"
          disabled={isLoading}
          onClick={() => deleteContact(contact.id)}
          className="ml-auto"
        >
          <HiMiniXMark className="hover:text-primary stroke-1 text-lg transition-colors" />
        </Button>
        <EditContactButton
          contact={contact}
          editContact={editContact}
          isLoading={isLoading}
        />
        <Button variant="empty" onClick={() => setIsOpen((prev) => !prev)}>
          <HiMiniChevronDown
            className={twMerge(
              "hover:text-primary stroke-1 text-lg transition-all ease-initial",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2">
          <p>Phone number: {phoneNumber}</p>
          <p>Description: {description}</p>
        </div>
      )}
    </li>
  );
}
