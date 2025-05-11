import { useContext, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import TeamsList from "./TeamsList";
import { HiMiniChevronDown } from "react-icons/hi2";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { Team } from "../../../types/team.type";

export default function TeamsDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const { teams, selectedTeam, setSelectedTeam } = useContext(TeamsContext);

  function handleTeamSelection(team: Team) {
    setSelectedTeam(team);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-primary flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 bg-white p-1"
      >
        <p className="text-nowrap">
          {selectedTeam ? `${selectedTeam.name} team` : "Select team"}
        </p>
        <HiMiniChevronDown
          className={twMerge(
            "ml-auto stroke-1 text-lg transition-transform ease-initial",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <TeamsList onTeamSelection={handleTeamSelection} teams={teams} />
      )}
    </div>
  );
}
