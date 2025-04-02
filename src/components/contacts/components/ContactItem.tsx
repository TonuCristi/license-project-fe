import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown } from "react-icons/hi2";
import Button from "../../Button";
import EditContactButton from "./EditContactButton";
import DeleteContactButton from "./DeleteContactButton";

import { Contact } from "../../../types/contact.type";

type Props = {
  index: number;
  contact: Contact;
};

export default function ContactItem({ index, contact }: Props) {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState<boolean>(false);

  const { id, name, phoneNumber, description } = contact;

  return (
    <li className="border-primary flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-1">
      <div className="flex items-center gap-2">
        <span>{`${index + 1}.)`}</span>
        <p className="w-full overflow-hidden font-medium text-ellipsis whitespace-nowrap">
          {name}
        </p>

        <DeleteContactButton contactId={id} />

        <EditContactButton contact={contact} />

        <Button
          variant="empty"
          onClick={() => setIsContactInfoOpen((prev) => !prev)}
        >
          <HiMiniChevronDown
            className={twMerge(
              "hover:text-primary stroke-1 text-lg transition-all ease-initial",
              isContactInfoOpen && "rotate-180",
            )}
          />
        </Button>
      </div>

      {isContactInfoOpen && (
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-medium">Phone number:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-medium">Description:</span> {description}
          </p>
        </div>
      )}
    </li>
  );
}
