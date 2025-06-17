import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Pagination from "../../Pagination";

import { Employee } from "../../../types/employee.type";
import { PER_PAGE } from "./TeamMembers";
import TeamMemberListItem from "./TeamMemberListItem";

type Props = {
  teamId: string;
  deleteMember: (membershipId: string, employeeId: string) => void;
  getMembers: (
    teamId: string,
    search: string,
    offset: number,
    perPage: number,
    controller: AbortController,
  ) => void;
  members: Employee[];
  pages: number;
  offset: number;
  isMembersLoading: boolean;
  isDeleteLoading: boolean;
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function TeamMembersList({
  teamId,
  deleteMember,
  getMembers,
  members,
  pages,
  offset,
  isMembersLoading,
  isDeleteLoading,
  setOffset,
}: Props) {
  const controllerRef = useRef<AbortController>();
  const { watch } = useFormContext();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    if (controllerRef.current) {
      getMembers(
        teamId,
        watch("search"),
        offset,
        PER_PAGE,
        controllerRef.current,
      );
    }
  }, [getMembers, watch, offset, teamId]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {members.map((member) => (
          <TeamMemberListItem
            key={member.id}
            deleteMember={deleteMember}
            member={member}
            isDeleteLoading={isDeleteLoading}
          />
        ))}
      </ul>
      {pages > 1 && (
        <Pagination
          isLoading={isMembersLoading}
          pages={pages}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
