import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AuthContext = {
  isLogged: boolean;
  token: string | null;
  isLoading: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContext>({
  isLogged: false,
  token: null,
  isLoading: false,
  setIsLogged: () => undefined,
  setToken: () => undefined,
  setIsLoading: () => undefined,
});

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [isLogged, setIsLogged] = useState<boolean>(() =>
    localStorage.getItem("token") ? true : false,
  );
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        token,
        isLoading,
        setIsLogged,
        setToken,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
