import { RoomResponse } from "../types/room.type";

export function mapRoom(room: RoomResponse) {
  const {
    _id: id,
    chief_id: chiefId,
    assistant_id: assistantId,
    createdAt,
  } = room;

  return { id, chiefId, assistantId, createdAt };
}
