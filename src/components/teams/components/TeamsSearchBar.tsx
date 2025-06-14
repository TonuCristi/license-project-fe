import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchTeams } from "../hooks/useFetchTeams";
import { TeamsContext } from "../../../contexts/TeamsContext";

type Props = {
  setOffset: Dispatch<SetStateAction<number>>;
};

export default function TeamsSearchBar({ setOffset }: Props) {
  const controllerRef = useRef<AbortController>();
  const { getTeams } = useFetchTeams();
  const { setTeams } = useContext(TeamsContext);

  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(1);
      setTeams([]);
      if (controllerRef.current) {
        getTeams(search, 0, 5, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getTeams, setTeams, setOffset]);

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
