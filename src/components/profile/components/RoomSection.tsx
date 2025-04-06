import { useContext } from "react";

import CreateRoomForm from "./CreateRoomForm";
import RoomInfo from "./RoomInfo";

import { RoomContext } from "../../../contexts/RoomContext";
import { UserContext } from "../../../contexts/UserContext";

export default function RoomSection() {
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  const roomMember =
    room?.chiefId === user?.id ? "Room assistant" : "Room chief";

  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-lg font-medium">
        {room ? roomMember : "Create room"}
      </h2>
      {room ? <RoomInfo /> : <CreateRoomForm />}
    </section>
  );
}
