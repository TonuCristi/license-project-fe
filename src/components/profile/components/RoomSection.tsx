import { useContext } from "react";

import CreateRoomForm from "./CreateRoomForm";
import RoomInfo from "./RoomInfo";

import { RoomContext } from "../../../contexts/RoomContext";

export default function RoomSection() {
  const { room } = useContext(RoomContext);

  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-lg font-medium">Room</h2>
      {room ? <RoomInfo /> : <CreateRoomForm />}
    </section>
  );
}
