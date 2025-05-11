import { useRef, useState } from "react";

import EditEmployeeForm from "./EditEmployeeForm";
import Button from "../../Button";

import { Employee } from "../../../types/employee.type";
import { useClickOutside } from "../../../hooks/useClickOutside";

type Props = {
  employee: Employee;
};

export default function EditEmployeeButton({ employee }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button onClick={() => setIsOpen((prev) => !prev)}>Edit</Button>

      {isOpen && <EditEmployeeForm employee={employee} />}
    </div>
  );
}
