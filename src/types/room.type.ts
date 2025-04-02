import { z } from "zod";

import { createRoomSchema } from "../schemas/createRoom.schema";

export type CreateRoom = z.infer<typeof createRoomSchema>;

export type RoomResponse = {
  _id: string;
  chief_id: string;
  assistant_id: string;
  createdAt: string;
};

export type Room = {
  id: string;
  chiefId: string;
  assistantId: string;
  createdAt: string;
};
