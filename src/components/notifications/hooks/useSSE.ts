import { useContext, useEffect } from "react";
import toast from "react-hot-toast";

import { UserContext } from "../../../contexts/UserContext";

export function useSSE() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const sse = new EventSource(
      `http://localhost:8000/api/events?token=${localStorage.getItem("token")}`,
    );

    sse.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      toast.success(message);
    });
  }, [user]);
}
