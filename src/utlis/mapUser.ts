import { UserResponse } from "../types/user.type";

export function mapUser(user: UserResponse) {
  const { _id: id, room_id: roomId, ...rest } = user;

  return { id, roomId: roomId || "", ...rest };
}
