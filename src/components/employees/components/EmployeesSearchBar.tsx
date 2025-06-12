import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { useFetchEmployees } from "../hooks/useFetchEmployees";

export default function EmployeesSearchBar() {
  const { getEmployees } = useFetchEmployees();
  const methods = useFormContext();

  const { watch } = methods;

  useEffect(() => {
    const { unsubscribe } = watch(({ value }) => {
      getEmployees(value, 0, 9);
    });

    return () => unsubscribe();
  }, [watch, getEmployees]);

  return (
    <form className="w-full">
      <Input
        name="value"
        placeholder="Search employees..."
        rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
      />
    </form>
  );
}
