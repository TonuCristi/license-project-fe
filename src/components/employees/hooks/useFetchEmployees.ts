import { useCallback, useContext } from "react";

import { EmployeesApi } from "../../../services/EmployeesApi";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { mapEmployee } from "../../../utlis/mapEmployee";

export function useFetchEmployees() {
  const { isLoading, setEmployees, setPages, setIsLoading } =
    useContext(EmployeesContext);

  const getEmployees = useCallback(
    function (search: string, offset: number, perPage: number) {
      setIsLoading(true);
      EmployeesApi.getEmployees(search, offset, perPage)
        .then((res) => {
          const employees = res.employees.map((employee) =>
            mapEmployee(employee),
          );
          setPages(res.pages);
          setEmployees(employees);
        })
        .catch((error) => console.log(error.response.data.message))
        .finally(() => setIsLoading(false));
    },
    [setEmployees, setPages, setIsLoading],
  );

  return { getEmployees, isLoading };
}
