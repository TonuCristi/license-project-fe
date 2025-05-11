import { useState } from "react";

import Button from "../../Button";
import ConfirmationModal from "../../ConfirmationModal";

import { useDeleteEmployee } from "../hooks/useDeleteEmployee";

type Props = {
  employeeId: string;
};

export default function DeleteEmployeeButton({ employeeId }: Props) {
  const { deleteEmployee, isLoading } = useDeleteEmployee();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="reject" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      {isOpen && (
        <ConfirmationModal
          onAprove={() => deleteEmployee(employeeId)}
          onReject={() => setIsOpen(false)}
          isLoading={isLoading}
        >
          Are you sure about deleting this employee?
        </ConfirmationModal>
      )}
    </>
  );
}
