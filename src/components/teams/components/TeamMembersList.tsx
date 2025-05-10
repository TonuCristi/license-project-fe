import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import TeamMemberListItem from "./TeamMemberListItem";
import Pagination from "../../Pagination";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { useFetchTeamMembers } from "../hooks/useFetchTeamMembers";

export default function TeamMembersList() {
  const {
    selectedTeam,
    members,
    pages,
    offset,
    isMembersLoading,
    setPages,
    setOffset,
  } = useContext(TeamsContext);
  const methods = useFormContext();

  const { getTeamMembers } = useFetchTeamMembers();

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
      {members.length > 0 && (
        <ul className="flex w-full flex-col gap-2">
          {members.map((member) => (
            <TeamMemberListItem key={member.id} member={member} />
          ))}
        </ul>
      )}
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
