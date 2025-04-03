import { useContext } from "react";

import DeleteRoomButton from "./DeleteRoomButton";

import { RoomContext } from "../../../contexts/RoomContext";

export default function RoomInfo() {
  const { assistant } = useContext(RoomContext);

  return (
    <div className="border-primary flex items-end rounded-lg border-2 p-2">
      <div className="flex w-full flex-col gap-2">
        <p>
          <span className="font-medium">Username:</span> {assistant?.username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {assistant?.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {assistant?.role}
        </p>
      </div>

      <DeleteRoomButton />
    </div>
  );
}
