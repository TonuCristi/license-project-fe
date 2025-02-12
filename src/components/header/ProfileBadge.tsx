import { useState } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Link } from "react-router";

export default function ProfileBadge() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-xl bg-white p-2"
      >
        <p>Tonu Cristian</p>
        <div className="h-8 w-8 rounded-full bg-blue-500"></div>
        <HiMiniChevronDown className="stroke-1 text-lg" />
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-3 flex w-full flex-col rounded-xl border-2 border-blue-500 bg-white p-1">
          <li className="transition-300 rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <Link to="/profile" className="inline-block w-full p-1">
              Profile
            </Link>
          </li>
          <li className="transition-300 rounded-lg transition-colors ease-initial hover:bg-blue-100">
            <button className="w-full cursor-pointer p-1 text-left">
              Log out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
