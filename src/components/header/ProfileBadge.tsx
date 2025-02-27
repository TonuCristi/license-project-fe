import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown } from "react-icons/hi2";
import { Link } from "react-router";

import { useClickOutside } from "../../hooks/useClickOutside";

export default function ProfileBadge() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-white p-2"
      >
        <p>Tonu Cristian</p>
        <div className="bg-primary h-8 w-8 rounded-full"></div>
        <HiMiniChevronDown
          className={twMerge(
            "stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <ul className="border-primary absolute top-full z-50 mt-3 flex w-full flex-col rounded-xl border-2 bg-white p-1">
          <li className="rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <Link to="/profile" className="inline-block w-full p-1">
              Profile
            </Link>
          </li>
          <li className="rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <button className="w-full cursor-pointer p-1 text-left">
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
