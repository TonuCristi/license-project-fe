import { useContext, useEffect } from "react";

import { RoomContext } from "../../../contexts/RoomContext";
import { RoomsApi } from "../../../services/RoomsApi";
import { mapRoom } from "../../../utlis/mapRoom";
import { mapUser } from "../../../utlis/mapUser";

export function useFetchRoom() {
  const { isLoading, setRoom, setAssistant, setChief, setIsLoading } =
    useContext(RoomContext);

  useEffect(() => {
    RoomsApi.getRoom()
      .then((res) => {
        const room = mapRoom(res.room);
        const assistant = mapUser(res.assistant);
        const chief = mapUser(res.chief);
        setRoom(room);
        setAssistant(assistant);
        setChief(chief);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [setRoom, setAssistant, setChief, setIsLoading]);

  return { isLoading };
}
