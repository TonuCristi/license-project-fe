import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Button from "../../Button";
import { HiMiniChevronDown } from "react-icons/hi2";
import TeamProjectList from "./TeamProjectList";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { useAddToProject } from "../hooks/useAddToProject";

type Props = {
  teamId: string;
};

export default function AddToProjectDropdown({ teamId }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { addToProject, isLoading: isAddToProjectLoading } = useAddToProject();

  function handleProjectSelection(projectId: string) {
    addToProject(projectId, teamId);
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-primary flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 bg-white p-1"
      >
        <p className="text-nowrap">Select project</p>
        <HiMiniChevronDown
          className={twMerge(
            "ml-auto stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {isOpen && (
        <TeamProjectList
          onProjectSelection={handleProjectSelection}
          isAddToProjectLoading={isAddToProjectLoading}
        />
      )}
    </div>
  );
}
