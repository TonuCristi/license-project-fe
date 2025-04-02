import { AxiosResponse } from "axios";
import { api } from "../config/api";
import { UserResponse } from "../types/user.type";
import { RoomResponse } from "../types/room.type";

const URL = "/api/rooms";

export const RoomsApi = {
  createRoom(assistantEmail: string) {
    return api
      .post(`${URL}/create-room`, {
        assistantEmail,
      })
      .then(
        ({
          data,
        }: AxiosResponse<{
          room: RoomResponse;
          assistant: UserResponse;
          message: string;
        }>) => data,
      );
  },
  getRoom() {
    return api.get(`${URL}/retrieve-room`).then(
      ({
        data,
      }: AxiosResponse<{
        room: RoomResponse;
        assistant: UserResponse;
      }>) => data,
    );
  },
};
