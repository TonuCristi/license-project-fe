import { useContext } from "react";
import { useNavigate } from "react-router";

import { Register } from "../../../types/user.type";
import { AuthContext } from "../../../contexts/AuthContext";
import { AuthApi } from "../../../services/AuthApi";

export function useRegister() {
  const { setIsLogged, setToken, setIsLoading, setError, isLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function register(credentials: Register) {
    setIsLoading(true);
    AuthApi.register(credentials)
      .then((res) => {
        setIsLogged(true);
        setToken(res);
        navigate("/");
        localStorage.setItem("token", res);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { register, isLoading };
}
