import { useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Pagination from "../../Pagination";
import TeamListItem from "./TeamListItem";

import { TeamsContext } from "../../../contexts/TeamsContext";
import { useFetchTeams } from "../hooks/useFetchTeams";
import { PER_PAGE } from "../../../pages/TeamsPage";

export default function TeamsList() {
  const { teams, pages, offset, isLoading, setOffset } =
    useContext(TeamsContext);
  const { watch } = useFormContext();
  const controllerRef = useRef<AbortController>();
  const { getTeams } = useFetchTeams();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    if (controllerRef.current) {
      getTeams(watch("search"), offset, PER_PAGE, controllerRef.current);
    }
  }, [getTeams, offset, watch]);

  return (
    <div className="xs:gap-8 flex flex-col items-center gap-4">
      <ul className="flex w-full flex-col gap-2">
        {teams.map((team) => (
          <TeamListItem key={team.id} team={team} />
        ))}
      </ul>
      {pages > 1 && (
        <Pagination
          isLoading={isLoading}
          pages={pages}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
