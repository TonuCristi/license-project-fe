import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { AppointmentsContext } from "../../../contexts/AppointmentsContext";
import { AppointmentsApi } from "../../../services/AppointmentsApi";

export function useDeleteAppointment() {
  const { setAppointments } = useContext(AppointmentsContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function deleteAppointment(appointmentId: string) {
    setIsLoading(true);
    AppointmentsApi.deleteAppointment(appointmentId)
      .then((res) => {
        setAppointments((prev) => [
          ...prev.filter((appointment) => appointment.id !== appointmentId),
        ]);

        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteAppointment, isLoading };
}
