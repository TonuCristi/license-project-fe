import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import TeamMemberListItem from "./TeamMemberListItem";
import Pagination from "../../Pagination";

import { Employee } from "../../../types/employee.type";
import { TeamsContext } from "../../../contexts/TeamsContext";

type Props = {
  getTeamMembers: (
    teamId: string,
    search: string,
    offset: string,
    perPage: string,
  ) => void;
  members: Employee[];
  pages: number;
  offset: number;
  isLoading: boolean;
  setPages: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function TeamMembersList({
  getTeamMembers,
  members,
  pages,
  offset,
  isLoading,
  setPages,
  setOffset,
}: Props) {
  const { selectedTeam } = useContext(TeamsContext);
  const methods = useFormContext();

  const { watch } = methods;

  useEffect(() => {
    if (selectedTeam) {
      getTeamMembers(selectedTeam.id, "", `${offset}`, "9");
    }
  }, [getTeamMembers, watch, selectedTeam, offset]);

  useEffect(() => {
    if (members.length === 0 && offset > 0) {
      setPages((prev) => prev - 1);
      setOffset((prev) => prev - 1);
    }
  }, [members, offset, setPages, setOffset]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {members.map((member) => (
          <TeamMemberListItem key={member.id} member={member} />
        ))}
      </ul>
      <Pagination
        isLoading={isLoading}
        pages={pages}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
}
