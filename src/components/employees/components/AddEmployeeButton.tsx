import { useRef, useState } from "react";

import Button from "../../Button";
import AddEmployeeForm from "./AddEmployeeForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function AddEmployeeButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        className="text-nowrap"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Add employee
      </Button>

      {isOpen && <AddEmployeeForm />}
    </div>
  );
}
