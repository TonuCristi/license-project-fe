import { useFormContext } from "react-hook-form";
import { useContext, useEffect, useRef } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { PER_PAGE } from "../../../constants/employees";

export default function EmployeesSearchBar() {
  const { getEmployees } = useFetchEmployees();
  const { setEmployees, setOffset } = useContext(EmployeesContext);
  const { watch } = useFormContext();
  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      setOffset(0);
      setEmployees([]);
      if (controllerRef.current) {
        getEmployees(search, 0, PER_PAGE, controllerRef.current);
      }
    });

    return () => unsubscribe();
  }, [watch, getEmployees, setEmployees, setOffset]);

  return (
    <form className="w-full">
      <Input
        name="search"
        placeholder="Search employees..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
