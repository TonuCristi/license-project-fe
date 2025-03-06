import { useContext } from "react";
import { useNavigate } from "react-router";

import { AuthApi } from "../../../services/AuthApi";
import { Login } from "../../../types/user.type";
import { AuthContext } from "../../../contexts/AuthContext";

export function useLogin() {
  const { isLoading, setIsLogged, setToken, setIsLoading, setError } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function login(credentials: Login) {
    setIsLoading(true);
    AuthApi.login(credentials)
      .then((res) => {
        setToken(res);
        setIsLogged(true);
        localStorage.setItem("token", res);
        navigate("/");
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { login, isLoading };
}
