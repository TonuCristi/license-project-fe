import { useContext, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "../Button";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Link } from "react-router";

import { useClickOutside } from "../../hooks/useClickOutside";
import { useLogout } from "../../hooks/useLogout";
import { UserContext } from "../../contexts/UserContext";

export default function ProfileBadge() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center gap-1 rounded-lg bg-white p-1 sm:gap-2 sm:p-2"
      >
        <p className="hidden text-ellipsis md:block">{user?.username}</p>
        <div className="bg-primary h-7 w-7 rounded-full sm:h-8 sm:w-8"></div>
        <HiMiniChevronDown
          className={twMerge(
            "stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <ul className="border-primary absolute top-full right-0 z-50 mt-3 flex w-24 flex-col rounded-xl border-2 bg-white p-1 sm:w-full">
          <li className="rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <Link to="/profile" className="inline-block w-full p-1">
              Profile
            </Link>
          </li>
          <li className="rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <Button
              variant="empty"
              onClick={logout}
              className="w-full cursor-pointer p-1 text-left"
            >
              Log out
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}
