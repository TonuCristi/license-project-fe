import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { PER_PAGE } from "../../../pages/EmployeesPage";

export default function EmployeesSearchBar() {
  const { getEmployees } = useFetchEmployees();
  const { watch } = useFormContext();

  useEffect(() => {
    const { unsubscribe } = watch(({ search }) => {
      getEmployees(search, 0, PER_PAGE);
    });

    return () => unsubscribe();
  }, [watch, getEmployees]);

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
