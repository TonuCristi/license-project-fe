import { useContext } from "react";

import DeleteRoomButton from "./DeleteRoomButton";

import { RoomContext } from "../../../contexts/RoomContext";
import { UserContext } from "../../../contexts/UserContext";

export default function RoomInfo() {
  const { room, assistant, chief } = useContext(RoomContext);
  const { user } = useContext(UserContext);

  const username =
    room?.chiefId === user?.id ? assistant?.username : chief?.username;
  const email = room?.chiefId === user?.id ? assistant?.email : chief?.email;
  const role = room?.chiefId === user?.id ? assistant?.role : chief?.role;

  return (
    <div className="border-primary flex items-end rounded-lg border-2 p-2">
      <div className="flex w-full flex-col gap-2">
        <p>
          <span className="font-medium">Username:</span> {username}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {role}
        </p>
      </div>

      {room?.chiefId === user?.id && <DeleteRoomButton />}
    </div>
  );
}
