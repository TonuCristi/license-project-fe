import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown, HiMiniXMark } from "react-icons/hi2";
import Button from "../Button";
import EditContactButton from "./EditContactButton";

export default function Contact() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <li className="border-primary flex flex-col gap-2 rounded-lg border-2 bg-white px-2 py-1">
      <div className="flex items-center gap-2">
        <p className="font-medium">Your name here</p>
        <span>-</span>
        <p className="font-medium">0796810051</p>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque in
          adipisci distinctio voluptate cumque labore perferendis cupiditate
          reiciendis? Provident quos libero accusamus aperiam iure quae
          temporibus accusantium, cum deleniti vero.
        </p>
      )}
    </li>
  );
}
