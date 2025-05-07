import { useRef, useState } from "react";

import Button from "../../Button";
import AddEmployeeForm from "./AddEmployeeForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function AddEmployeeButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="xxs:w-auto relative w-full">
      <Button
        className="xxs:w-auto w-full text-nowrap"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add employee
      </Button>

      {isOpen && <AddEmployeeForm />}
    </div>
  );
}
