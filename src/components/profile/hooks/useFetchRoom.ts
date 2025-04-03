import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { RoomContext } from "../../../contexts/RoomContext";
import { RoomsApi } from "../../../services/RoomsApi";
import { mapRoom } from "../../../utlis/mapRoom";
import { mapUser } from "../../../utlis/mapUser";

export function useFetchRoom() {
  const { isLoading, setRoom, setAssistant, setIsLoading } =
    useContext(RoomContext);

  useEffect(() => {
    RoomsApi.getRoom()
      .then((res) => {
        const room = mapRoom(res.room);
        const assistant = mapUser(res.assistant);
        setRoom(room);
        setAssistant(assistant);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [setRoom, setAssistant, setIsLoading]);

  return { isLoading };
}
