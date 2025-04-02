import { useContext } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import { AuthApi } from "../../../services/AuthApi";
import { Login } from "../../../types/user.type";
import { AuthContext } from "../../../contexts/AuthContext";

export function useLogin() {
  const { isLoading, setIsLogged, setToken, setIsLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function login(credentials: Login) {
    setIsLoading(true);
    AuthApi.login(credentials)
      .then((res) => {
        setIsLogged(true);
        setToken(res);
        navigate("/");
        localStorage.setItem("token", res);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => setIsLoading(false));
  }

  return { login, isLoading };
}
