import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown } from "react-icons/hi2";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function AddToTeamDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-primary flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 bg-white p-1"
      >
        <p className="text-nowrap">Select team</p>
        <HiMiniChevronDown
          className={twMerge(
            "ml-auto stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <ul className="border-primary absolute top-full right-0 z-50 mt-1 flex w-full flex-col rounded-xl border-2 bg-white p-1">
          <li>aaa</li>
          <li>bbb</li>
          <li>ccc</li>
        </ul>
      )}
    </div>
  );
}
