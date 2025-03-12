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
  error: string;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  isLoading: true,
  error: "",
  setUser: () => undefined,
  setIsLoading: () => undefined,
  setError: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ user, isLoading, error, setUser, setIsLoading, setError }}
    >
      {children}
    </UserContext.Provider>
  );
}
