import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import Input from "../../input/Input";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { searchBarSchema } from "../../../schemas/searchBar.schema";
import { SearchBar } from "../../../types/searchBar.type";

export default function EmployeesSearchBar() {
  const methods = useForm<SearchBar>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(searchBarSchema),
  });

  return (
    <FormProvider {...methods}>
      <form className="w-full">
        <Input
          name="value"
          placeholder="Search your employee..."
          rightIcon={<HiMiniMagnifyingGlass className="text-md stroke-1" />}
        />
      </form>
    </FormProvider>
  );
}
