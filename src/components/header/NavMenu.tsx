import { useRef, useState } from "react";

import Button from "../Button";
import NavbarItem from "./NavbarItem";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link } from "react-router";

import { useClickOutside } from "../../hooks/useClickOutside";

const links = [
  { to: "employees", text: "Employees" },
  { to: "teams", text: "Teams" },
  { to: "projects", text: "Projects" },
  { to: "meetings", text: "Meetings" },
];

export default function NavMenu() {
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
        <HiMiniBars3 className="stroke-1 text-xl text-white" />
      </Button>

      {isOpen && (
        <ul className="border-primary xs:w-40 absolute top-full left-0 z-50 mt-4 flex w-36 flex-col gap-2 rounded-xl border-2 bg-white p-2">
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
