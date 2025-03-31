import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { User } from "../types/user.type";

type UserContext = {
  user: User;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultUser: User = {
  id: "",
  username: "",
  email: "",
  role: "",
};

export const UserContext = createContext<UserContext>({
  user: defaultUser,
  isLoading: true,
  setUser: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
}
