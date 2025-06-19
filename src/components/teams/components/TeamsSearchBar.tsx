import { useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchTeams } from "../hooks/useFetchTeams";
import { TeamsContext } from "../../../contexts/TeamsContext";
import { PER_PAGE } from "../../../constants/teams";

export default function TeamsSearchBar() {
  const { setTeams, setOffset } = useContext(TeamsContext);
  const { getTeams } = useFetchTeams();
  const controllerRef = useRef<AbortController>();

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(0);
      setTeams([]);
      if (controllerRef.current) {
        getTeams(search, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [getTeams, setOffset, setTeams, watch]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search your team..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
