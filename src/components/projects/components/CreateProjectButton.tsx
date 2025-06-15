import { useRef, useState } from "react";

import Button from "../../Button";
import CreateProjectForm from "./CreateProjectForm";

import { useClickOutside } from "../../../hooks/useClickOutside";

export default function CreateProjectButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="full"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-nowrap"
      >
        Create project
      </Button>

      {isOpen && <CreateProjectForm />}
    </div>
  );
}
