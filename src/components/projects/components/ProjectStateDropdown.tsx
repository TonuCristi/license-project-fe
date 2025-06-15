import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HiMiniChevronDown } from "react-icons/hi2";
import Button from "../../Button";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { ProjectState } from "../../../types/project.type";

const stateOptions: { value: ProjectState; text: string }[] = [
  { value: "pending", text: "Pending" },
  { value: "progress", text: "In progess" },
  { value: "finished", text: "Finished" },
];

const projectState = {
  pending: "Pending",
  progress: "In progess",
  finished: "Finished",
};

type Props = {
  projectId: string;
  state: ProjectState;
  editState: (projectId: string, state: ProjectState, cb: () => void) => void;
  isEditStateLoading: boolean;
};

export default function ProjectStateDropdown({
  projectId,
  state,
  editState,
  isEditStateLoading,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  function getStatusColor(state: ProjectState) {
    const states = {
      pending: "bg-gray-500",
      progress: "bg-primary",
      finished: "bg-emerald-500",
    };

    return states[state];
  }

  const handleCloseDropdown = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl p-2 font-medium text-white ${getStatusColor(state)}`}
      >
        <p className="text-nowrap">{projectState[state]}</p>
        <HiMiniChevronDown
          className={twMerge(
            "ml-auto stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {isOpen && (
        <ul className="border-primary absolute top-full right-0 z-50 mt-1 flex max-h-64 w-full flex-col gap-2 rounded-xl border-2 bg-white p-2 transition-colors">
          {stateOptions.map(({ value, text }) => (
            <li key={value}>
              <Button
                variant="empty"
                disabled={isEditStateLoading}
                onClick={() => editState(projectId, value, handleCloseDropdown)}
                className="w-full rounded-xl bg-blue-100 p-2 text-left text-nowrap hover:bg-blue-200"
              >
                {text}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
