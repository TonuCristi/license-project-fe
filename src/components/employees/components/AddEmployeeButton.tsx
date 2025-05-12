import { useContext, useRef, useState } from "react";

import Button from "../../Button";
import AddEmployeeForm from "./AddEmployeeForm";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { EmployeesContext } from "../../../contexts/EmployeesContext";

export default function AddEmployeeButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { isLoading } = useContext(EmployeesContext);

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        disabled={isLoading}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Add employee
      </Button>

      {isOpen && <AddEmployeeForm />}
    </div>
  );
}
