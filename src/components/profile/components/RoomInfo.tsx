import { useContext } from "react";

import Button from "../../Button";

import { RoomContext } from "../../../contexts/RoomContext";

export default function RoomInfo() {
  const { assistant } = useContext(RoomContext);
  const { username, email, role } = assistant;

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

      <Button variant="reject" className="whitespace-nowrap">
        Delete room
      </Button>
    </div>
  );
}
