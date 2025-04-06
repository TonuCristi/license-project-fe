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
          chief: UserResponse;
          message: string;
        }>) => data,
      );
  },
  getRoom() {
    return api.get(`${URL}/retrieve-room`).then(
      ({
        data,
      }: AxiosResponse<{
        room: RoomResponse | null;
        assistant: UserResponse | null;
        chief: UserResponse | null;
      }>) => data,
    );
  },
  deleteRoom() {
    return api
      .delete(`${URL}/delete-room`)
      .then(({ data }: AxiosResponse<{ message: string }>) => data.message);
  },
};
