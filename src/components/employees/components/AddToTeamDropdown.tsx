import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import { HiMiniChevronDown } from "react-icons/hi2";
import EmployeeTeamList from "./EmployeeTeamList";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { Team } from "../../../types/team.type";
import { useAddToTeam } from "../hooks/useAddToTeam";

type Props = {
  employeesList: string[];
};

export default function AddToTeamDropdown({ employeesList }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { addToTeam, isLoading } = useAddToTeam();

  function handleTeamSelection(team: Team) {
    if (!employeesList.length) {
      return toast.error("You didn't select any employees!");
    }

    addToTeam(team.id, employeesList);
  }

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
        <EmployeeTeamList
          onTeamSelection={handleTeamSelection}
          isAddToTeamLoading={isLoading}
        />
      )}
    </div>
  );
}
