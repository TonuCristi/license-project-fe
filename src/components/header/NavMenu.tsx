import { useRef, useState } from "react";

import Button from "../Button";
import NavbarItem from "./NavbarItem";
import ContactsButton from "./ContactsButton";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router";

import { useClickOutside } from "../../hooks/useClickOutside";

const links = [
  { to: "employees", text: "Employees" },
  { to: "teams", text: "Teams" },
  { to: "meetings", text: "Meetings" },
];

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button variant="empty" onClick={() => setIsOpen((prev) => !prev)}>
        <HiMiniBars3 className="stroke-1 text-xl text-white" />
      </Button>

      {isOpen && (
        <ul className="border-primary absolute top-full left-1/2 z-50 mt-4 flex w-40 -translate-x-1/2 flex-col gap-2 rounded-xl border-2 bg-white p-2">
          <ContactsButton />
          {links.map(({ to, text }) => (
            <NavbarItem key={to}>
              <Link to={`/${to}`} onClick={() => setIsOpen(false)}>
                {text}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      )}
    </div>
  );
}
