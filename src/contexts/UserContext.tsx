import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { User } from "../types/user.type";

type UserContext = {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  isLoading: true,
  setUser: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
