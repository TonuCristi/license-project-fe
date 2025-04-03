import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Room } from "../types/room.type";
import { User } from "../types/user.type";

type RoomContext = {
  room: Room | null;
  assistant: User | null;
  isLoading: boolean;
  setRoom: Dispatch<SetStateAction<Room | null>>;
  setAssistant: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const RoomContext = createContext<RoomContext>({
  room: null,
  assistant: null,
  isLoading: true,
  setRoom: () => undefined,
  setAssistant: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function RoomProvider({ children }: Props) {
  const [room, setRoom] = useState<Room | null>(null);
  const [assistant, setAssistant] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <RoomContext.Provider
      value={{
        room,
        assistant,
        isLoading,
        setRoom,
        setAssistant,
        setIsLoading,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
