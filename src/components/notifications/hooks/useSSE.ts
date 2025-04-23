import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { RoomContext } from "../../../contexts/RoomContext";

export function useSSE() {
  const { room } = useContext(RoomContext);

  useEffect(() => {
    const sse = new EventSource(
      `http://localhost:8000/sse/${room ? room.id : ""}`,
    );

    sse.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      toast.success(message);
      console.log(JSON.parse(data));
    });
  }, [room]);
}
