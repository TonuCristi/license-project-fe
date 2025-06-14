import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../Button";
import EmployeeTeamSearchBar from "./EmployeeTeamSearchBar";

import { Team } from "../../../types/team.type";
import { SearchBar } from "../../../types/searchBar.type";
import { searchBarSchema } from "../../../schemas/searchBar.schema";
import { useFetchEmployeeTeams } from "../hooks/useFetchEmployeeTeams";

type Props = {
  onTeamSelection: (team: Team) => void;
  isAddToTeamLoading: boolean;
};

export default function EmployeeTeamList({
  onTeamSelection,
  isAddToTeamLoading,
}: Props) {
  const methods = useForm<SearchBar>({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchBarSchema),
  });
  const { getTeams, teams, isLoading, setTeams } = useFetchEmployeeTeams();
  const [offset, setOffset] = useState<number>(0);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  const controllerRef = useRef<AbortController>();

  const { watch } = methods;

  useEffect(() => {
    const options = {
      root: listRef.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        controllerRef.current = new AbortController();
        getTeams(watch("search"), offset, 5, controllerRef.current);
        setOffset((prev) => prev + 1);
      }
    }, options);

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [teams.length, watch, getTeams]);

  return (
    <FormProvider {...methods}>
      <div className="border-primary absolute top-full right-0 z-50 mt-1 flex max-h-64 w-full flex-col gap-2 rounded-xl border-2 bg-white p-2 transition-colors">
        <EmployeeTeamSearchBar
          getTeams={getTeams}
          setTeams={setTeams}
          setOffset={setOffset}
        />
        <ul
          ref={listRef}
          className="scrollbar flex flex-col gap-2 overflow-y-auto pr-2"
        >
          {teams.map((team) => (
            <li key={team.id}>
              <Button
                variant="empty"
                disabled={isAddToTeamLoading}
                onClick={() => onTeamSelection(team)}
                className="w-full rounded-xl bg-blue-100 p-2 text-left hover:bg-blue-200"
              >
                {team.name}
              </Button>
            </li>
          ))}
          <li ref={itemRef} className="p-0.5"></li>
        </ul>
      </div>
    </FormProvider>
  );
}
