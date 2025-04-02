import { RoomResponse } from "../types/room.type";

export function mapRoom(room: RoomResponse) {
  const { _id, chief_id, assistant_id, createdAt } = room;

  return { id: _id, chiefId: chief_id, assistantId: assistant_id, createdAt };
}
