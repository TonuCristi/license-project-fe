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
  room: Room | undefined;
  assistant: User | undefined;
  chief: User | undefined;
  isLoading: boolean;
  setRoom: Dispatch<SetStateAction<Room | undefined>>;
  setAssistant: Dispatch<SetStateAction<User | undefined>>;
  setChief: Dispatch<SetStateAction<User | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const RoomContext = createContext<RoomContext>({
  room: undefined,
  assistant: undefined,
  chief: undefined,
  isLoading: true,
  setRoom: () => undefined,
  setAssistant: () => undefined,
  setChief: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function RoomProvider({ children }: Props) {
  const [room, setRoom] = useState<Room | undefined>(undefined);
  const [assistant, setAssistant] = useState<User | undefined>(undefined);
  const [chief, setChief] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <RoomContext.Provider
      value={{
        room,
        assistant,
        chief,
        isLoading,
        setRoom,
        setAssistant,
        setChief,
        setIsLoading,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
