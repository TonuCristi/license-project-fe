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
  error: string;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContext>({
  isLogged: false,
  token: null,
  isLoading: false,
  error: "",
  setIsLogged: () => undefined,
  setToken: () => undefined,
  setIsLoading: () => undefined,
  setError: () => undefined,
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
  const [error, setError] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        token,
        isLoading,
        error,
        setIsLogged,
        setToken,
        setIsLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
