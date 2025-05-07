import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { EmployeesApi } from "../../../services/EmployeesApi";
import { EmployeesContext } from "../../../contexts/EmployeesContext";

export function useDeleteEmployee() {
  const { setEmployees } = useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteEmployee(employeeId: string) {
    setIsLoading(true);
    EmployeesApi.deleteEmployee(employeeId)
      .then((res) => {
        setEmployees((prev) => [
          ...prev.filter((employee) => employee.id !== employeeId),
        ]);
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteEmployee, isLoading };
}
