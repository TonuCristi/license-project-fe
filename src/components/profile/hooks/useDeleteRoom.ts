import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { RoomsApi } from "../../../services/RoomsApi";
import { UserContext } from "../../../contexts/UserContext";
import { RoomContext } from "../../../contexts/RoomContext";

export function useDeleteRoom() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useContext(UserContext);
  const { setRoom, setAssistant, setChief } = useContext(RoomContext);

  function deleteRoom() {
    setIsLoading(true);
    RoomsApi.deleteRoom()
      .then((res) => {
        setUser((prev) => (prev ? { ...prev, roomId: "" } : undefined));
        setRoom(undefined);
        setAssistant(undefined);
        setChief(undefined);
        toast.success(res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { deleteRoom, isLoading };
}
