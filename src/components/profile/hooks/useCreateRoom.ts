import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { RoomsApi } from "../../../services/RoomsApi";
import { mapRoom } from "../../../utlis/mapRoom";
import { mapUser } from "../../../utlis/mapUser";
import { RoomContext } from "../../../contexts/RoomContext";
import { UserContext } from "../../../contexts/UserContext";

export function useCreateRoom() {
  const { setUser } = useContext(UserContext);
  const { setRoom, setAssistant, setChief } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function createRoom(assistantEmail: string) {
    setIsLoading(true);
    RoomsApi.createRoom(assistantEmail)
      .then((res) => {
        const room = mapRoom(res.room);
        const assistant = mapUser(res.assistant);
        const chief = mapUser(res.chief);
        setRoom(room);
        setAssistant(assistant);
        setChief(chief);
        setUser((prev) => (prev ? { ...prev, roomId: room.id } : null));
        toast.success(res.message);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { createRoom, isLoading };
}
