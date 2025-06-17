import { useContext, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import { HiMiniChevronDown } from "react-icons/hi2";
import EmployeeTeamList from "./EmployeeTeamList";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { useAddToTeam } from "../hooks/useAddToTeam";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import Button from "../../Button";

type Props = {
  employeesList: string[];
};

export default function AddToTeamDropdown({ employeesList }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { addToTeam, isLoading: isAddToTeamLoading } = useAddToTeam();
  const { isLoading: isEmployeesLoading } = useContext(EmployeesContext);

  function handleTeamSelection(teamId: string) {
    if (!employeesList.length) {
      return toast.error("You didn't select any employees!");
    }

    addToTeam(teamId, employeesList);
  }

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="empty"
        disabled={isEmployeesLoading}
        onClick={() => setIsOpen((prev) => !prev)}
        className={twMerge(
          "border-primary flex w-full items-center gap-2 rounded-lg border-2 bg-white p-1",
        )}
      >
        <p className="text-nowrap">Select team</p>
        <HiMiniChevronDown
          className={twMerge(
            "ml-auto stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {isOpen && (
        <EmployeeTeamList
          onTeamSelection={handleTeamSelection}
          isAddToTeamLoading={isAddToTeamLoading}
        />
      )}
    </div>
  );
}
