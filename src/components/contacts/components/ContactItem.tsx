import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown, HiMiniXMark } from "react-icons/hi2";
import Button from "../../Button";
import EditContactButton from "./EditContactButton";

import { Contact } from "../../../types/contact.type";

type Props = {
  index: number;
  contact: Contact;
};

export default function ContactItem({ index, contact }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { name, phoneNumber, description } = contact;

  return (
    <li className="border-primary flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-1">
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <span>{`${index + 1}.)`}</span>
        <p className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
          {name}
        </p>
        <Button variant="empty" className="ml-auto">
          <HiMiniXMark className="hover:text-primary stroke-1 text-lg transition-colors" />
        </Button>
        <EditContactButton />
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
