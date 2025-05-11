import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { EditEmployee } from "../../../types/employee.type";
import { EmployeesApi } from "../../../services/EmployeesApi";
import { EmployeesContext } from "../../../contexts/EmployeesContext";
import { mapEmployee } from "../../../utlis/mapEmployee";

export function useEditEmployee() {
  const { setEmployees } = useContext(EmployeesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function editEmployee(employeeId: string, newEditedEmployee: EditEmployee) {
    setIsLoading(true);
    EmployeesApi.editEmployee(employeeId, newEditedEmployee)
      .then((res) => {
        const editedEmployee = mapEmployee(res.editedEmployee);

        setEmployees((prev) => {
          const editedEmployeeIndex = prev.findIndex(
            (employee) => employee.id === employeeId,
          );

          const firstHalf = prev.slice(0, editedEmployeeIndex);
          const secondHalf = prev
            .slice(editedEmployeeIndex, prev.length)
            .filter((employee) => employee.id !== employeeId);

          return [...firstHalf, editedEmployee, ...secondHalf];
        });

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { editEmployee, isLoading };
}
